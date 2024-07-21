import React, { useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import StartRoundButton from "./StartRoundButton";
import ChatInput from "./ChatInput/ChatInput";
import GameContent from "./GameContent";
import GameHeader from "./GameHeader/GameHeader";
import { getAiResponse } from "../../utils/GameAI/GameAiPlayer";
import { searchLastFM } from "../../api/lastFM/lastFM";
import { useGameStore } from "../../stores/gameStore";

export default function NewGame({ navigation }: { navigation: any }) {
  // DEBUG: Adding first message - A random band name
  useEffect(() => {
    async function getNewBand() {
      try {
        const randomLetter = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        );
        const newBands = await searchLastFM(randomLetter);
        const newBand = newBands[Math.floor(Math.random() * newBands.length)]
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        handleAddNewBand(newBand, "opponent");
      } catch (error) {
        console.error("Failed to fetch new band", error);
      }
    }

    getNewBand();

    return () => {
      // Resetting the game store when leaving the match
      useGameStore.setState({
        bands: [],
        currentBandName: "",
        gameStarted: false,
      });
    };
  }, []);

  const [inputBandName, setInputBandName] = useState("");
  const gameData = useGameStore((state) => state);

  useEffect(() => {
    if (gameData.bands.length === 0) return;

    const lastBand = gameData.bands[gameData.bands.length - 1];

    if (lastBand.guesser === "player") {
      const randomTimeoutTime = Math.floor(Math.random() * 6000) + 1000;

      const fetchAndAddBand = async () => {
        try {
          const lastLetter = gameData.currentBandName.slice(-1);
          const searchResults = await searchLastFM(lastLetter);

          let newBand = "";
          for (
            let i = Math.floor(Math.random() * searchResults.length);
            i < searchResults.length;
            i++
          ) {
            if (searchResults[i][0] === lastLetter) {
              newBand = searchResults[i];

              newBand = newBand
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              console.log("New band: ", newBand);

              handleAddNewBand(newBand, "opponent");
              break;
            }
          }
        } catch (error) {
          console.error("Failed to fetch new band", error);
        }
      };

      const timeoutId = setTimeout(() => {
        if (gameData.currentBandName) {
          return fetchAndAddBand();
        } else {
          return getAiResponse();
        }
      }, randomTimeoutTime);

      return () => clearTimeout(timeoutId);
    }
  }, [gameData.bands]);

  const handleSetRoundStarted = () => {
    useGameStore.setState({ gameStarted: true });
  };

  const handleAddNewBand = (
    bandName: string,
    player: "player" | "opponent"
  ) => {
    bandName = bandName.trim();
    useGameStore.setState((state) => ({
      bands: [...state.bands, { name: bandName, guesser: player }],
      currentBandName: bandName,
      gameStarted: false,
    }));
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
      <GameHeader navigation={navigation} />

      <GameContent />
      {gameData.gameStarted ? (
        <ChatInput
          setInputBandName={setInputBandName}
          inputBandName={inputBandName}
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
