import React, { useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import StartRoundButton from "./StartRoundButton";
import ChatInput from "./ChatInput";
import GameContent from "./GameContent";
import GameHeader from "./GameHeader/GameHeader";
import { GameData } from "../../types";
import { getAiResponse } from "../../utils/GameAI/GameAiPlayer";

const initialGameData: GameData = {
  players: {
    player: {
      id: "player-id", // TODO: Replace with "player-id"
      name: "Player 1",
      score: 0,
      strikes: 0,
    },
    opponent: {
      id: "opponent-id", // TODO: Replace with "opponent-id
      name: "Player 2",
      score: 0,
      strikes: 0,
    },
  },
  bands: [],
  currentBandName: "",
  inputBandName: "",
  gameStarted: false,
};

const DebugBandNames = [
  "The Cardigans",
  "Snoop Dogg",
  "The Who",
  "Pink Floyd",
  "K's Choice",
  "Amason",
];

export default function NewGame({ navigation }: { navigation: any }) {
  // DEBUG: Adding first message - A random band name
  useEffect(() => {
    const randomBandName =
      DebugBandNames[Math.floor(Math.random() * DebugBandNames.length)];
    handleAddNewBand(randomBandName, "opponent");
  }, []);

  const [inputBandName, setInputBandName] = useState("");

  const [gameData, setGameData] = useState<GameData>(initialGameData);

  useEffect(() => {
    if (gameData.bands.length === 0) return;
    const lastBand = gameData.bands[gameData.bands.length - 1];
    if (lastBand.guesser === "player") {
      const randomTimeoutTime = Math.floor(Math.random() * 6000) + 1000;
      setTimeout(() => {
        const newBand = getAiResponse(gameData);

        if (!newBand) return;
        handleAddNewBand(newBand, "opponent");
      }, randomTimeoutTime);
    }
  }, [gameData.bands]);

  const handleSetRoundStarted = () => {
    setGameData((prev) => {
      return {
        ...prev,
        gameStarted: true,
      };
    });
  };

  const handleAddNewBand = (
    bandName: string,
    player: "player" | "opponent"
  ) => {
    bandName = bandName.trim();
    setGameData((prev) => {
      return {
        ...prev,
        bands: [...prev.bands, { name: bandName, guesser: player }],
        currentBandName: bandName,
        gameStarted: false,
      };
    });
  };

  const isWaitingOnOpponent = () => {
    if (gameData.bands.length === 0) return false;
    const lastBand = gameData.bands[gameData.bands.length - 1];
    if (lastBand.guesser === "opponent") return false;
    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GameHeader
        navigation={navigation}
        roundStarted={gameData.gameStarted}
        gameData={gameData}
      />

      <GameContent inputBandName={inputBandName} gameData={gameData} />
      {gameData.gameStarted ? (
        <ChatInput
          setInputBandName={setInputBandName}
          inputBandName={inputBandName}
          gameData={gameData}
          handleAddNewBand={handleAddNewBand}
        />
      ) : (
        <StartRoundButton
          navigation={navigation}
          waiting={isWaitingOnOpponent()}
          setRoundStarted={handleSetRoundStarted}
        />
      )}
    </KeyboardAvoidingView>
  );
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
});
