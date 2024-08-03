import React, { useEffect, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import StartRoundButton from "./StartRoundButton";
import ChatInput from "./ChatInput/ChatInput";
import GameContent from "./GameContent";
import GameHeader from "./GameHeader/GameHeader";
import { getAiResponse } from "../../utils/GameAI/GameAiPlayer";
import { searchLastFM } from "../../api/lastFM/lastFM";
import { useGameStore } from "../../stores/gameStore";
import uuid from "react-native-uuid";
import { handleAddNewBand } from "./handleAddBand";
import { setCurrentBandName } from "../../stores/gameStoreFunctions";
import { useActiveGamesStore } from "../../stores/activeGamesStore";
import { GameData } from "../../types";

export default function NewGame({ navigation }: { navigation: any }) {
  const addGame = useActiveGamesStore((state) => state.addGame);

  const [currentGameId, setCurrentGameId] = useState("");
  const [currentGameData, setCurrentGameData] = useState<GameData | null>(null);
  const [inputBandName, setInputBandName] = useState("");

  const createNewGame = async () => {
    const newGameId = uuid.v4() as string;
    const newGame: GameData = {
      players: {
        homePlayer: {
          id: "playerID",
          name: "Anton",
          score: 0,
          strikes: 0,
        },
        awayPlayer: {
          id: "opponentID",
          name: "Snobben",
          score: 0,
          strikes: 0,
        },
      },
      bands: [],
      currentBandName: "The Cardigans", // DEBUG: Adding first band name
      inputBandName: "",
      gameStarted: true,
      currentTurn: "homePlayer",
      id: newGameId,
    };

    const addedGameId = await addGame(newGame);
    if (addedGameId) {
      return addedGameId;
    } else {
      console.error("Failed to add new game");
      return null;
    }
  };

  const handleCreateNewGame = async () => {
    const newGameId = await createNewGame();
    if (newGameId) {
      setCurrentGameId(newGameId);
    } else {
      console.error("Failed to create new game");
    }
  };

  useEffect(() => {
    handleCreateNewGame();
  }, []);

  useEffect(() => {
    const currentGameRef = useActiveGamesStore
      .getState()
      .games.find((game) => game.id === currentGameId);
    if (!currentGameRef) return;
    setCurrentGameData(currentGameRef);

    if (currentGameRef.bands.length === 0) return;

    runComputerGuess(currentGameId);
  }, [currentGameId, currentGameData?.bands, currentGameData?.currentTurn]);

  const handleSetRoundStarted = () => {
    useGameStore.setState({ gameStarted: true });
  };

  const isWaitingOnOpponent = () => {
    if (!currentGameData) return false;

    if (currentGameData?.bands.length === 0) return false;
    const lastBand = currentGameData.bands[currentGameData.bands.length - 1];
    if (lastBand.guesser === "awayPlayer") return false;
    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GameHeader gameId={currentGameId} navigation={navigation} />

      <GameContent gameId={currentGameId} />
      {currentGameData?.gameStarted ? (
        <ChatInput
          gameId={currentGameId}
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

const runComputerGuess = async (currentGameId: string) => {
  const gameData = useActiveGamesStore
    .getState()
    .games.find((game) => game.id === currentGameId);

  if (!gameData)
    return console.error("Game not found - please check the game ID");

  const lastBand = gameData.bands[gameData.bands.length - 1];

  if (lastBand.guesser === "homePlayer" && lastBand.status === "valid") {
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

            const guessId = uuid.v4() as string;
            handleAddNewBand(newBand, "awayPlayer", guessId, currentGameId);
            setCurrentBandName(guessId);
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
};

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
