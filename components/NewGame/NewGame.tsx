import React, { useState } from "react";
import BandGameClient from "./BandGameClient";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

export default function NewGame({ navigation }: Readonly<{ navigation: any }>) {
  const [player, setPlayer] = useState<"player0" | "player1">("player0");
  const [matchId, setMatchId] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleCreateGame = () => {
    console.log("Create game");

    setGameStarted(true);
  };

  const handleJoinGame = () => {
    console.log("Join game");

    setGameStarted(true);
  };

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
      <View style={styles.matchIdContainer}>
        <TextInput
          style={styles.matchIdInput}
          placeholder="Match ID"
          onChangeText={(text) => setMatchId(text)}
          value={matchId ?? ""}
        />
        <TouchableOpacity
          style={styles.joinGameButton}
          onPress={() => {
            setPlayer("player1");
            handleJoinGame();
          }}
        >
          <Text style={styles.joinGameText}>Join game</Text>
        </TouchableOpacity>
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
  matchIdContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
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
});
