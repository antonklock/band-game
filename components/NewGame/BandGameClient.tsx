import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Client } from "boardgame.io/react-native";
import { SocketIO } from "boardgame.io/multiplayer";

type GameState = {
  lastPing: number | null;
  pingCount: number;
  pongCount: number;
};

// Game board component that displays the game state and handles moves
const GameBoard = ({
  G,
  ctx,
  moves,
}: {
  G: GameState;
  ctx: any;
  moves: any;
}) => {
  console.log("Available moves:", moves); // Debug log
  console.log("Game state:", G); // Debug log
  console.log("Game context:", ctx); // Debug log

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Band Game</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Ping Count: {G.pingCount}</Text>
        <Text style={styles.stat}>Pong Count: {G.pongCount}</Text>
        {G.lastPing && (
          <Text style={styles.stat}>
            Last Ping: {new Date(G.lastPing).toLocaleString()}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.pingButton}
        onPress={() => {
          console.log("Button pressed"); // Debug log
          moves.ping();
        }}
      >
        <Text style={styles.buttonText}>PING!</Text>
      </TouchableOpacity>

      <Text style={styles.debugText}>Debug Info:</Text>
      <Text>Moves available: {Object.keys(moves || {}).join(", ")}</Text>
    </View>
  );
};

// Create the client
const BandGameClient = Client({
  game: {
    name: "band-game",
    setup: () => ({
      lastPing: null,
      pingCount: 0,
      pongCount: 0,
    }),
    moves: {
      ping: ({ G }: { G: GameState }) => {
        G.pingCount += 1;
        G.pongCount += 1;
        G.lastPing = Date.now();
      },
    },
  },
  board: GameBoard,
  multiplayer: SocketIO({
    server: "http://localhost:8000",
  }),
  debug: true,
});

const styles = StyleSheet.create({
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  debugText: {
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default BandGameClient;
