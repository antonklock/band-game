import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useGameStore } from "../../stores/gameStore";
import { GameData } from "../../types";
import GameHeader from "./GameHeader/GameHeader";
import GameContent from "./GameContent";
import ChatInput from "./ChatInput/ChatInput";
import StartRoundButton from "./StartRoundButton";

export default function NewGame({ navigation }: Readonly<{ navigation: any }>) {
  const { createGame, game: game, isLoading, error } = useGameStore();

  const handleCreateGame = async () => {
    try {
      const newGameData: Omit<GameData, "id"> = {
        players: {
          homePlayer: {
            id: "homeID",
            name: "Home Player",
            score: 0,
            strikes: 0,
          },
          awayPlayer: {
            id: "awayID",
            name: "Away Player",
            score: 0,
            strikes: 0,
          },
        },
        previousGuesses: [],
        currentBandName: "",
        inputBandName: "",
        gameStarted: false,
        currentTurn: "homePlayer",
      };
      await createGame(newGameData);
    } catch (error) {
      console.error("Failed to create new game:", error);
    }
  };

  useEffect(() => {
    handleCreateGame();
  }, []);

  useEffect(() => {
    if (game) {
      console.log("Game updated:", game);
    }
  }, [game]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.whiteText}>Creating new game...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (game) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <GameHeader navigation={navigation} />

        <GameContent />
        {game?.gameStarted ? (
          <ChatInput />
        ) : (
          <StartRoundButton navigation={navigation} />
        )}
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.whiteText}>Couldn't find game...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  gameHeader: {
    marginTop: 20,
    display: "flex",
    gap: 4,
    alignItems: "center",
    paddingTop: 40,
  },
  text: {
    color: "white",
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 20,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderRadius: 10,
    flex: 4,
  },
  submitButton: {
    backgroundColor: "#50ab64",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  readyButtonView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText: {
    color: "white",
  },
});
