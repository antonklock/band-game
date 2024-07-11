import { useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { GameData } from "../../types";

type ChatInputProps = {
  gameData: GameData;
  setInputBandName: (inputBandName: string) => void;
  inputBandName: string;
  handleAddNewBand: (bandName: string, player: "player" | "opponent") => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { setInputBandName, inputBandName, gameData, handleAddNewBand } = props;

  const inputRef = useRef<TextInput>(null);

  // Validate band name
  const isValidBandName = (bandName: string) => {
    const currentBandName = gameData.currentBandName;
    const currentBandNameLength = currentBandName.length;
    if (bandName.length === 0) return false;

    // If the band name starts with "the", remove it
    if (bandName.substring(0, 3).toLowerCase() === "the") {
      bandName = removeWord("the", bandName).trim().toLowerCase();
    }

    if (
      currentBandName[currentBandNameLength - 1].toLowerCase() ===
      bandName[0].toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const removeWord = (wordToRemove: string, bandName: string) => {
    if (
      bandName.substring(0, wordToRemove.length).toLowerCase() === wordToRemove
    ) {
      bandName = bandName.substring(3, bandName.length);
    }
    return bandName;
  };

  const handleNewGuess = (guessBandName: string) => {
    if (!isValidBandName(guessBandName)) return handleInvalidGuess();
    else console.log("Valid band name");

    const player = "player";

    // Each first letter is capitalized
    guessBandName = guessBandName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    handleAddNewBand(guessBandName, player);
    inputRef.current?.clear();
    inputRef.current?.blur();

    setInputBandName("");
  };

  const handleSetInputBandName = (inputBandName: string) => {
    setInputBandName(inputBandName);
  };

  const handleInvalidGuess = () => {
    console.log("Invalid guess");
    inputRef.current?.setNativeProps({
      style: {
        ...styles.textInput,
        borderColor: "red",
        borderWidth: 2,
        color: "red",
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
        onChangeText={(text) => handleSetInputBandName(text)}
        value={inputBandName}
      ></TextInput>
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
