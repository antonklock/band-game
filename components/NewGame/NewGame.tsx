import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import StartRoundButton from "./StartRoundButton";
import ChatInput from "./ChatInput";
import GameContent from "./GameContent";
import GameHeader from "./GameHeader";
import { GameData } from "../../types";

const initialGameData: GameData = {
  players: {
    player1: {
      name: "Player 1",
      score: 0,
    },
    player2: {
      name: "Player 2",
      score: 0,
    },
  },
  bands: [
    {
      name: "The Cardigans",
      guesser: "player1",
    },
  ],
  currentBandName: "The Cardigans",
  inputBandName: "",
};

export default function NewGame({ navigation }: { navigation: any }) {
  const [roundStarted, setRoundStarted] = useState(false);
  const [currentBandName, setCurrentBandName] = useState("The Cardigans");
  const [inputBandName, setInputBandName] = useState("");

  const [gameData, setGameData] = useState<GameData>(initialGameData);

  const handleSetRoundStarted = () => {
    setRoundStarted(true);
  };

  const handleAddNewBand = (
    bandName: string,
    player: "player1" | "player2"
  ) => {
    setGameData((prev) => {
      return {
        ...prev,
        bands: [...prev.bands, { name: bandName, guesser: player }],
        currentBandName: bandName,
      };
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GameHeader navigation={navigation} roundStarted={roundStarted} />
      <GameContent inputBandName={inputBandName} gameData={gameData} />
      {roundStarted ? (
        <ChatInput
          setInputBandName={setInputBandName}
          inputBandName={inputBandName}
          gameData={gameData}
          handleAddNewBand={handleAddNewBand}
        />
      ) : (
        <StartRoundButton setRoundStarted={handleSetRoundStarted} />
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
  gameContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    width: "95%",
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
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
