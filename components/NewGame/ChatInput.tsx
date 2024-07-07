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
  handleAddNewBand: (bandName: string, player: "player1" | "player2") => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { setInputBandName, inputBandName, gameData, handleAddNewBand } = props;

  const inputRef = useRef<TextInput>(null);

  const isValidBandName = (bandName: string) => {
    const currentBandName = gameData.currentBandName;
    const currentBandNameLength = currentBandName.length;
    if (bandName.length === 0) return false;
    if (
      currentBandName[currentBandNameLength - 1].toLowerCase() ===
      bandName[0].toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNewGuess = (guessBandName: string) => {
    if (!isValidBandName(guessBandName))
      return console.log("Invalid band name");
    else console.log("Valid band name");

    const player = "player1";
    handleAddNewBand(guessBandName, player);
    inputRef.current?.clear();
  };

  return (
    <View style={styles.inputView}>
      <TextInput
        ref={inputRef}
        autoFocus={true}
        style={styles.textInput}
        placeholder="Enter band name"
        onChangeText={setInputBandName}
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
