import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Client } from "boardgame.io/react-native";
import { Ctx } from "boardgame.io";
import { SocketIO } from "boardgame.io/multiplayer";

const DEV_SERVER_URL = "http://192.168.50.218:8000";

type GameState = {
  scores: {
    player0: number;
    player1: number;
  };
  currentPlayer: "player0" | "player1";
};

type GameMoves = {
  rollPoints: () => void;
  skipTurn: () => void;
};

const GameBoard = ({
  G,
  moves,
  isConnected,
  playerID,
}: {
  G: GameState;
  moves: GameMoves;
  isConnected: boolean;
  playerID: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Band Game</Text>

      {!isConnected && (
        <Text style={styles.errorText}>Connecting to server...</Text>
      )}

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Connection: {isConnected ? "✅" : "❌"}</Text>
        <Text style={styles.stat}>Server: {DEV_SERVER_URL}</Text>
        <Text style={styles.stat}>Player: {playerID}</Text>
        <View>
          <Text style={styles.stat}>
            Player0 score: {G?.scores.player0 || 0}
          </Text>
          <Text style={styles.stat}>
            Player1 score: {G?.scores.player1 || 0}
          </Text>
        </View>

        <Text style={styles.stat}>
          <Text style={styles.stat}>Current Player: {G?.currentPlayer}</Text>
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.pingButton, !isConnected && styles.disabledButton]}
          onPress={() => {
            moves.rollPoints();
          }}
          disabled={!isConnected}
        >
          <Text style={styles.buttonText}>Roll Points!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pingButton, !isConnected && styles.disabledButton]}
          onPress={() => {
            moves.skipTurn();
          }}
          disabled={!isConnected}
        >
          <Text style={styles.buttonText}>Skip Turn!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Create the client
const BandGameClient = Client({
  game: {
    name: "band-game",
    setup: () => ({
      scores: {
        player0: 0,
        player1: 0,
      },
      currentPlayer: "player0",
    }),
    moves: {
      rollPoints: ({ G, ctx }: { G: GameState; ctx: Ctx }) => {
        G.scores[ctx.currentPlayer as keyof GameState["scores"]] += (
          ctx._random as unknown as {
            int: (min: number, max: number) => number;
          }
        ).int(1, 6);
      },
      skipTurn: ({ G, ctx }: { G: GameState; ctx: Ctx }) => {
        G.currentPlayer =
          ctx.currentPlayer === "player0" ? "player1" : "player0";
      },
    },
    turn: {
      minMoves: 1,
      maxMoves: 2,
    },
    endIf: ({ G }: { G: GameState }) => {
      if (G.scores.player0 >= 10 || G.scores.player1 <= -10)
        return { winner: "player0" };
      if (G.scores.player1 >= 10 || G.scores.player0 <= -10)
        return { winner: "player1" };
    },
  },
  board: GameBoard,
  multiplayer: SocketIO({
    server: DEV_SERVER_URL,
  }),
  debug: __DEV__,
});

// Wrapper component to ensure proper mounting
const GameWrapper = ({ playerID }: { playerID: string }) => {
  return (
    <View style={styles.wrapper}>
      <BandGameClient playerID={playerID} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stat: {
    fontSize: 16,
    marginBottom: 10,
  },
  pingButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  debugText: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default GameWrapper;
