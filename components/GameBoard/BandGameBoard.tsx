import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { z } from "zod";
import { gameStateSchema, moveSchema } from "../../zod/schemas";
import { Ctx } from "boardgame.io";

type GameState = z.infer<typeof gameStateSchema>;
type Message = z.infer<typeof moveSchema>;

const BandGameBoard = ({
  G,
  ctx,
  moves,
  playerID,
}: {
  G: GameState;
  ctx: Ctx;
  moves: any;
  playerID: string;
}) => {
  const [bandName, setBandName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isMyTurn = playerID === ctx.currentPlayer;
  const isHomePlayer = playerID === "0";

  const handleSubmit = () => {
    setError(null);

    try {
      moveSchema.shape.bandName.parse(bandName);
      moves.playBand(bandName);
      setBandName("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Game status */}
      <Text style={styles.status}>
        {isMyTurn ? "Your turn!" : "Waiting turn..."}
      </Text>

      {/* Band history */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Band History:</Text>
        <FlatList<Message>
          data={G.messages}
          renderItem={({ item, index }) => (
            <View style={styles.messageRow}>
              <Text style={styles.playerIndicator}>
                {item.playerId === playerID ? "P1" : "P2"}:
              </Text>
              <Text style={styles.bandName}>{item.bandName}</Text>
              {index > 0 && (
                <Text style={styles.letterConnection}>
                  ('{item.bandName[0].toUpperCase()}')
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item) => `${item.playerId}-${item.timestamp}`}
        />
      </View>

      {/* Score display */}
      <View style={styles.scoreContainer}>
        {isHomePlayer ? (
          <>
            <Text style={styles.scoreText}>
              Home: {G.scores[playerID || ""] || 0}
            </Text>
            {/* <Text style={styles.scoreText}>
              Away: {G.scores[opponentId] || 0}
            </Text> */}
          </>
        ) : (
          <>
            <Text style={styles.scoreText}>
              Away: {G.scores[playerID || ""] || 0}
            </Text>
            {/* <Text style={styles.scoreText}>
              Home: {G.scores[opponentId] || 0}
            </Text> */}
          </>
        )}
      </View>

      {/* Input section remains the same */}
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        value={bandName}
        onChangeText={setBandName}
        placeholder="Enter band name..."
      />
      <Button title="Submit" onPress={handleSubmit} disabled={!isMyTurn} />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  status: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  historyContainer: {
    flex: 1,
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  messageRow: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  playerIndicator: {
    fontWeight: "bold",
    marginRight: 8,
    width: 70,
    color: "white",
  },
  bandName: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  letterConnection: {
    color: "#666",
    fontSize: 12,
    marginLeft: 8,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default BandGameBoard;
