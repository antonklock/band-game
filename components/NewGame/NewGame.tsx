import React, { useEffect, useState } from "react";
import BandGameClient from "./BandGameClient";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Game, LobbyAPI } from "boardgame.io";
import { LobbyClient } from "boardgame.io/client";

const DEV_LOBBY_URL = "http://192.168.50.218:8080";
const lobbyClient = new LobbyClient({ server: DEV_LOBBY_URL });

type MatchList = {
  matchID: string;
  players: string[];
  setupData?: any;
}[];

export default function NewGame({ navigation }: Readonly<{ navigation: any }>) {
  const [player, setPlayer] = useState<"player0" | "player1">("player0");
  const [gameStarted, setGameStarted] = useState(false);
  const [games, setGames] = useState<string[]>([]);
  const [matches, setMatches] = useState<LobbyAPI.Match[]>([]);
  const [updatedMatches, setUpdatedMatches] = useState(false);

  useEffect(() => {
    lobbyClient.listGames().then((data) => setGames(data));
    lobbyClient.listMatches("band-game").then((data) => {
      const { matches } = data;
      const newMatches = [...matches];
      setMatches(newMatches);
    });
    setUpdatedMatches(false);
  }, [updatedMatches]);

  const handleCreateGame = () => {
    lobbyClient
      .createMatch("band-game", {
        numPlayers: 2,
        setupData: {
          scores: {
            player0: 0,
            player1: 0,
          },
          currentPlayer: "player0",
        },
      })
      .catch((err) => console.log(err))
      .then(() => {
        setUpdatedMatches(true);
      });
  };

  // const handleJoinGame = () => {
  //   console.log("Join game");

  //   setGameStarted(true);
  // };

  return gameStarted ? (
    <View style={styles.container}>
      <BandGameClient playerID={player} />
    </View>
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.playerButton}
        onPress={() => {
          setPlayer("player0");
          handleCreateGame();
        }}
      >
        <Text style={styles.playerText}>Create game</Text>
      </TouchableOpacity>
      <View style={styles.gamesContainer}>
        {games.length > 0 ? (
          games.map((game) => (
            <Text style={styles.matchIdText} key={game}>
              {game}
            </Text>
          ))
        ) : (
          <Text style={styles.matchIdText}>No games</Text>
        )}
        <Text style={styles.matchIdText}>Matches</Text>
        {matches.map((match) => (
          <View
            style={[
              styles.matchCard,
              {
                backgroundColor: "#2A2A2A",
                padding: 15,
                borderRadius: 10,
                marginVertical: 8,
                width: "90%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            ]}
            key={match.matchID}
          >
            <View style={styles.matchCardContent}>
              <Text style={[styles.matchIcon, { marginRight: 15 }]}>🎮</Text>
              <Text style={[styles.matchIdText, { flex: 1 }]}>
                {match.matchID}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  joinGameButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  joinGameText: {
    color: "white",
  },
  playerButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  playerText: {
    color: "white",
  },
  gamesContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  matchIdInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: "white",
    backgroundColor: "lightgray",
    fontWeight: "bold",
  },
  matchIdText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  matchCardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  matchIcon: {
    fontSize: 24,
    marginRight: 10,
  },
});
