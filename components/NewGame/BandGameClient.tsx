import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Client } from "boardgame.io/react-native";
import { SocketIO } from "boardgame.io/multiplayer";

const DEV_SERVER_URL = "http://192.168.50.218:8000";

type GameState = {
  lastPing: string | null;
  pingCount: number;
  pongCount: number;
};

type GameMoves = {
  ping: () => void;
};

const GameBoard = ({
  G,
  ctx,
  moves,
  isConnected,
}: {
  G: GameState;
  ctx: unknown;
  moves: GameMoves;
  isConnected: boolean;
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
        <Text style={styles.stat}>Ping Count: {G?.pingCount || 0}</Text>
        <Text style={styles.stat}>Pong Count: {G?.pongCount || 0}</Text>
        {G?.lastPing && (
          <Text style={styles.stat}>
            Last Ping: {new Date(G.lastPing).toLocaleString()}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.pingButton, !isConnected && styles.disabledButton]}
        onPress={() => {
          console.log("Ping button pressed");
          if (moves?.ping) {
            moves.ping();
          } else {
            console.log("moves.ping is not available");
          }
        }}
        disabled={!isConnected}
      >
        <Text style={styles.buttonText}>PING!</Text>
      </TouchableOpacity>
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
      ping: ({ G, _ctx }: { G: GameState; _ctx: unknown }) => {
        G.pingCount += 1;
        G.pongCount += 1;
        G.lastPing = new Date().toISOString();
      },
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
});

export default GameWrapper;
