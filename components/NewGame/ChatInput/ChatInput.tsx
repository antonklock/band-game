import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import uuid from "react-native-uuid";
import { useGameStore } from "../../../stores/gameStore";
import { isValidBand } from "./validateBandName";
import { getAiResponse } from "../../../utils/GameAI/GameAiPlayer";
import {
  Band,
  BandStatus,
  GameData,
  GuesserType as Guesser,
} from "../../../types";

const ChatInput: React.FC = () => {
  const { game, updateGame, loadGame } = useGameStore();
  const [inputBand, setInputBand] = useState({ name: "", listeners: "0" });
  const inputRef = useRef<TextInput>(null);

  const handleNewGuess = async (
    guessBand: { name: string; listeners: string },
    guesser: Guesser
  ) => {
    if (guessBand.name.length === 0 || !game) return;
    let guessBandName = guessBand.name.trim();

    console.log("guessBandName: ", guessBand.name);

    guessBandName = guessBandName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newGuessId = uuid.v4() as string;
    const newGuess: Band = {
      id: newGuessId,
      name: guessBandName,
      guesser,
      status: "validating",
    };

    // Update the game in the store
    await updateGame((currentGame: GameData) => ({
      ...currentGame,
      previousGuesses: [...currentGame.previousGuesses, newGuess],
    }));

    console.log("newGuessId: ", newGuessId);

    let guessIsValid = false;
    try {
      guessIsValid = await isValidBand(guessBand);
    } catch (error) {
      console.error("Error validating band:", error);
    }

    console.log("guessIsValid: ", guessIsValid);

    setInputBand({ name: "", listeners: "0" });

    setTimeout(async () => {
      await updateGame((currentGame: GameData) => {
        const updatedGuesses = currentGame.previousGuesses.map((guess) =>
          guess.id === newGuessId
            ? {
                ...guess,
                status: (guessIsValid ? "valid" : "invalid") as BandStatus,
                guesser: guessIsValid
                  ? guesser === "homePlayer"
                    ? "awayPlayer"
                    : "homePlayer"
                  : guesser,
              }
            : guess
        );

        return {
          ...currentGame,
          previousGuesses: updatedGuesses,
          currentTurn: guessIsValid
            ? guesser === "homePlayer"
              ? "awayPlayer"
              : "homePlayer"
            : guesser,
          currentBandName: guessIsValid
            ? guessBandName
            : currentGame.currentBandName,
        };
      });

      if (!guessIsValid) {
        handleInvalidGuess();
      } else {
        inputRef.current?.clear();
        inputRef.current?.blur();

        // AI ANSWER
        if (guesser === "homePlayer" && game) {
          const randomTime = Math.random() * 3000 + 1000;
          console.log(`randomTime: ${randomTime}`);

          setTimeout(() => {
            const guesses = game.previousGuesses.map((guess) => guess.name);
            const aiGuess = getAiResponse(guessBandName, guesses);
            if (aiGuess)
              handleNewGuess(
                { name: aiGuess, listeners: "1000000" },
                "awayPlayer"
              );
          }, randomTime);
        }
      }
    }, Math.random() * 3000 + 1000);
  };

  const handleInvalidGuess = () => {
    console.log("Invalid guess");
    inputRef.current?.focus();
    inputRef.current?.setNativeProps({
      style: {
        ...styles.textInput,
        borderColor: "green",
        borderWidth: 2,
        color: "black",
      },
    });
    setTimeout(() => {
      inputRef.current?.setNativeProps({
        style: {
          ...styles.textInput,
          borderColor: "black",
          borderWidth: 0,
          color: "black",
        },
      });
    }, 2000);
  };

  return (
    <View style={styles.inputView}>
      <TextInput
        ref={inputRef}
        autoFocus={true}
        style={styles.textInput}
        placeholder="Enter band name"
        onChangeText={(text) => setInputBand({ name: text, listeners: "0" })}
        value={inputBand.name}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleNewGuess(inputBand, "homePlayer");
        }}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 20,
    paddingBottom: 20,
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
});

export default ChatInput;
