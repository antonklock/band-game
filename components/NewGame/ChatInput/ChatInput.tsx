import { useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { isValidBandName } from "./validateBandName";
import { useGameStore } from "../../../stores/gameStore";
import uuid from "react-native-uuid";
import {
  setCurrentBandName,
  updateBandStatus,
} from "../../../stores/gameStoreFunctions";
import { GuesserType } from "../../../types";

type ChatInputProps = {
  setInputBandName: (inputBandName: string) => void;
  inputBandName: string;
  handleAddNewBand: (
    bandName: string,
    player: GuesserType,
    guessId: string
  ) => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { setInputBandName, inputBandName, handleAddNewBand } = props;

  const gameData = useGameStore((state) => state);

  const inputRef = useRef<TextInput>(null);
  const [theWord, setTheWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [isCorrectLetter, setIsCorrectLetter] = useState(false);

  const startsWithThe = (inputString: string): boolean => {
    const lowercaseInput = inputString.toLowerCase().trim();
    return (
      lowercaseInput === "t" ||
      lowercaseInput === "th" ||
      lowercaseInput === "the" ||
      lowercaseInput.startsWith("the ")
    );
  };

  useEffect(() => {
    const currentBandNameLastLetter = gameData.currentBandName
      .slice(-1)
      .toLowerCase();

    if (startsWithThe(inputBandName)) {
      if (inputBandName.length >= 3) {
        if (
          inputBandName.substring(3, 5).toLowerCase() ===
          " " + currentBandNameLastLetter
        ) {
          setIsCorrectLetter(true);
          setTheWord(inputBandName.substring(0, 3));
          setCurrentGuess(inputBandName.substring(3, inputBandName.length));
        } else {
          setIsCorrectLetter(false);
          setTheWord(inputBandName.substring(0, 3));
          setCurrentGuess(inputBandName.substring(3, inputBandName.length));
        }
      } else {
        setIsCorrectLetter(false);
        setTheWord(inputBandName);
        setCurrentGuess("");
      }
    } else {
      setTheWord("");
      setCurrentGuess(inputBandName);
    }
  }, [inputBandName]);

  const handleNewGuess = async (guessBandName: string) => {
    if (guessBandName.length === 0) return;
    guessBandName = guessBandName.trim();

    const player = "homePlayer";

    guessBandName = guessBandName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const guessId = uuid.v4() as string;
    handleAddNewBand(guessBandName, player, guessId);

    const guessIsValid = await isValidBandName(guessBandName);

    setInputBandName("");

    const timeout = setTimeout(() => {
      updateBandStatus(guessId, guessIsValid ? "valid" : "invalid");

      if (!guessIsValid) {
        handleInvalidGuess();
      } else {
        useGameStore.setState({ gameStarted: false });
        setCurrentBandName(guessId);
        inputRef.current?.clear();
        inputRef.current?.blur();
      }
      clearInterval(timeout);
    }, Math.random() * 3000 + 1000);
  };

  const handleSetInputBandName = (inputBandName: string) => {
    setInputBandName(inputBandName);
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
    const currentBandNameLength = gameData.currentBandName.length;
    const currentBandNameLastLetter =
      gameData.currentBandName[currentBandNameLength - 1].toLowerCase();
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
        style={{ ...styles.textInput, ...styleWordThe(inputBandName) }}
        placeholder="Enter band name"
        onChangeText={(text) => handleSetInputBandName(text)}
      >
        {theWord ? (
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
        )}
      </TextInput>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleNewGuess(inputBandName);
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
