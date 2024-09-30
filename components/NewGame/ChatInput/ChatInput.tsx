import { useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { isValidBand } from "./validateBandName";
import { useGameStore } from "../../../stores/gameStore";
import uuid from "react-native-uuid";
import { GuesserType as Guesser } from "../../../types";
import { useGame } from "../../../hooks/useGame";
import { getAiResponse } from "../../../utils/GameAI/GameAiPlayer";

type ChatInputProps = {
  gameId: string;
};

const ChatInput = (props: ChatInputProps) => {
  const { gameId } = props;

  const [inputBand, setInputBand] = useState({ name: "", listeners: "0" });

  const handleAddNewBand = (bandName: string, guesser: Guesser) => {
    const guessId = uuid.v4() as string;

    updateGame(gameId, (game) => {
      game.previousGuesses.push({
        id: guessId,
        name: bandName,
        guesser,
        status: "validating",
      });
      return game;
    });

    return guessId;
  };

  // TODO: Do we really need both useGameStore and a useGame??
  const { updateGame } = useGameStore();
  const gameData = useGame(gameId);
  const { game } = gameData;

  const inputRef = useRef<TextInput>(null);
  // const [theWord, setTheWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState({
    name: "",
    listeners: "0",
  });
  // const [isCorrectLetter, setIsCorrectLetter] = useState(false);

  // const startsWithThe = (inputString: string): boolean => {
  //   const lowercaseInput = inputString.toLowerCase().trim();
  //   return (
  //     lowercaseInput === "t" ||
  //     lowercaseInput === "th" ||
  //     lowercaseInput === "the" ||
  //     lowercaseInput.startsWith("the ")
  //   );
  // };

  useEffect(() => {
    if (!game) {
      console.warn("Game not found!");
      return;
    }

    // if (!game.currentBandName) console.log("No currentBandName");
    // else console.log("currentBandName: ", game.currentBandName);

    setCurrentGuess(inputBand);

    // const currentBandNameLastLetter = game.currentBandName
    //   .slice(-1)
    //   .toLowerCase();

    // if (startsWithThe(inputBandName)) {
    //   if (inputBandName.length >= 3) {
    //     if (
    //       inputBandName.substring(3, 5).toLowerCase() ===
    //       " " + currentBandNameLastLetter
    //     ) {
    //       setIsCorrectLetter(true);
    //       setTheWord(inputBandName.substring(0, 3));
    //       setCurrentGuess(inputBandName.substring(3, inputBandName.length));
    //     } else {
    //       setIsCorrectLetter(false);
    //       setTheWord(inputBandName.substring(0, 3));
    //       setCurrentGuess(inputBandName.substring(3, inputBandName.length));
    //     }
    //   } else {
    //     setIsCorrectLetter(false);
    //     setTheWord(inputBandName);
    //     setCurrentGuess("");
    //   }
    // } else {
    //   setTheWord("");
    //   setCurrentGuess(inputBandName);
    // }
  }, [inputBand]);

  const handleNewGuess = async (
    guessBand: { name: string; listeners: string },
    guesser: Guesser
  ) => {
    if (guessBand.name.length === 0) return;
    let guessBandName = guessBand.name.trim();

    console.log("guessBandName: ", guessBand.name);

    guessBandName = guessBandName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newGuessId = handleAddNewBand(guessBand.name, guesser);

    const guessIsValid = await isValidBand(guessBand, gameId);

    setInputBand({ name: "", listeners: "0" });

    const timeout = setTimeout(() => {
      // updateBandStatus(newGuessId, guessIsValid ? "valid" : "invalid");

      updateGame(gameId, (game) => {
        // TODO: Write a proper update band status function in the store
        const guessToUpdate = game.previousGuesses.find(
          (band) => band.id === newGuessId
        );
        if (!guessToUpdate) {
          console.warn("Guess not found!");
          return game;
        }
        guessToUpdate.status = guessIsValid ? "valid" : "invalid";
        const nextGuesser = guessIsValid
          ? guesser === "homePlayer"
            ? ("awayPlayer" as Guesser)
            : ("homePlayer" as Guesser)
          : guesser === "homePlayer"
          ? ("homePlayer" as Guesser)
          : ("awayPlayer" as Guesser);

        console.log("nextGuesser: ", nextGuesser);

        const updatedGame = {
          ...game,
          previousGuesses: game.previousGuesses.map((band) => {
            if (band.id === newGuessId) {
              return guessToUpdate;
            }
            return band;
          }),
          currentTurn: nextGuesser,
          currentBandName: guessBandName,
          gameStarted: false,
        };
        return updatedGame;
      });

      if (!guessIsValid) {
        handleInvalidGuess();
      } else {
        inputRef.current?.clear();
        inputRef.current?.blur();

        // AI ANSWER
        if (guesser == "homePlayer") {
          const randomTime = Math.random() * 3000 + 1000;
          console.log(`randomTime: ${randomTime}`);

          setTimeout(() => {
            const previousGuesses = game?.previousGuesses.map(
              (guess) => guess.name
            );

            if (!previousGuesses) return;
            const aiGuess = getAiResponse(guessBandName, previousGuesses);
            if (aiGuess)
              handleNewGuess(
                { name: aiGuess, listeners: "1000000" },
                "awayPlayer"
              );
          }, randomTime);
        }
      }
      clearInterval(timeout);
    }, Math.random() * 3000 + 1000);
  };

  const handleSetInputBandName = (inputBand: {
    name: string;
    listeners: string;
  }) => {
    setInputBand(inputBand);
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

  //TODO: Clean this up
  const styleWordThe = (inputBandName: string) => {
    if (!inputBandName) return { color: "black" };
    if (!game) {
      console.warn("Game not found!");
      return { color: "black" };
    }
    const currentBandNameLength = game?.currentBandName.length;
    const currentBandNameLastLetter =
      game?.currentBandName[currentBandNameLength - 1].toLowerCase();
    const inputBandNameFirstLetter = inputBandName[0].toLowerCase();

    if (inputBandNameFirstLetter === "T" || inputBandNameFirstLetter === "t") {
      return { color: "gray" };
    } else if (inputBandNameFirstLetter != currentBandNameLastLetter) {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  return (
    <View style={styles.inputView}>
      <TextInput
        ref={inputRef}
        autoFocus={true}
        // style={{ ...styles.textInput, ...styleWordThe(inputBandName) }}
        style={{ ...styles.textInput }}
        placeholder="Enter band name"
        onChangeText={(text) =>
          handleSetInputBandName({ name: text, listeners: "0" })
        }
      >
        {currentGuess.name}
        {/* {theWord ? (
          <>
            {isCorrectLetter ? (
              <>
                <Text style={{ color: "gray" }}>{theWord}</Text>
                <Text style={{ color: "green" }}>{currentGuess}</Text>
              </>
            ) : (
              <>
                <Text style={{ color: "gray" }}>{theWord}</Text>
                <Text style={{ color: "red" }}>{currentGuess}</Text>
              </>
            )}
          </>
        ) : (
          <Text>{inputBandName}</Text>
        )} */}
      </TextInput>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          // TODO: Make sure the guesser is correct here. If the local player is the awayPlayer this will be wrong.
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
