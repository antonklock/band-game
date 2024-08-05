import React, { useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import StartRoundButton from "./StartRoundButton";
import ChatInput from "./ChatInput/ChatInput";
import GameContent from "./GameContent";
import GameHeader from "./GameHeader/GameHeader";
import { getAiResponse } from "../../utils/GameAI/GameAiPlayer";
import { searchLastFM } from "../../api/lastFM/lastFM";
import uuid from "react-native-uuid";
import { handleAddNewBand } from "./handleAddBand";
import { setCurrentBandName } from "../../stores/gameStoreFunctions";
import { useGame } from "../../hooks/useGame";
import { useGameStore } from "../../stores/gameStore";

export default function NewGame({ navigation }: { navigation: any }) {
  // DEBUG: Adding first message - A random band name
  // useEffect(() => {
  //   async function getNewBand() {
  //     try {
  //       const randomLetter = String.fromCharCode(
  //         65 + Math.floor(Math.random() * 26)
  //       );
  //       const newBands = await searchLastFM(randomLetter);
  //       const newBand = newBands[Math.floor(Math.random() * newBands.length)]
  //         .split(" ")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ");

  //       const guessId = uuid.v4() as string;
  //       handleAddNewBand(newBand, "awayPlayer", guessId);
  //       setCurrentBandName(guessId);
  //     } catch (error) {
  //       console.error("Failed to fetch new band", error);
  //     }
  //   }

  //   // getNewBand();

  //   return () => {
  //     // Resetting the game store when leaving the match
  //     // useGameStore.setState({
  //     //   bands: [],
  //     //   currentBandName: "",
  //     //   gameStarted: false,
  //     // });
  //   };
  // }, []);

  const [gameId, setGameId] = useState(() => uuid.v4() as string);
  const { updateGame } = useGameStore();
  const { game, loading, error } = useGame(gameId);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.whiteText}>Loading game...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.whiteText}>Error: {error}</Text>
      </View>
    );
  }

  if (!game) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.whiteText}>No game found...</Text>
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <GameHeader navigation={navigation} gameId={game.id} />

        {/* <GameContent /> */}
        {game?.gameStarted ? (
          <ChatInput gameId={gameId} />
        ) : (
          <StartRoundButton gameId={gameId} navigation={navigation} />
        )}
      </KeyboardAvoidingView>
    );
  }

  const [inputBandName, setInputBandName] = useState("");

  useEffect(() => {
    if (!game) return;
    if (game.bands.length === 0) return;

    const lastBand = game.bands[game.bands.length - 1];

    if (lastBand.guesser === "homePlayer" && lastBand.status === "valid") {
      const randomTimeoutTime = Math.floor(Math.random() * 6000) + 1000;

      const fetchAndAddBand = async () => {
        try {
          const lastLetter = game.currentBandName.slice(-1);
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

              const guessId = uuid.v4() as string;
              handleAddNewBand(newBand, "awayPlayer", guessId);
              setCurrentBandName(guessId);
              break;
            }
          }
        } catch (error) {
          console.error("Failed to fetch new band", error);
        }
      };

      const timeoutId = setTimeout(() => {
        if (game.currentBandName) {
          return fetchAndAddBand();
        } else {
          return getAiResponse();
        }
      }, randomTimeoutTime);

      return () => clearTimeout(timeoutId);
    }
  }, [game?.bands]);

  const handleSetRoundStarted = () => {
    updateGame(game.id, (game) => ({ ...game, gameStarted: true }));
  };

  // const isWaitingOnOpponent = () => {
  //   if (!game) {
  //     console.error("No game found!");
  //     return false;
  //   }
  //   if (game.bands.length === 0) return false;
  //   const lastBand = game.bands[game.bands.length - 1];
  //   if (lastBand.guesser === "awayPlayer") return false;
  //   return true;
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GameHeader navigation={navigation} />

      <GameContent />
      {game?.gameStarted ? (
        <ChatInput
          gameId={gameId}
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText: {
    color: "white",
  },
});
