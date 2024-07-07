import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";

type ChatInputProps = {
  setInputBandName: (inputBandName: string) => void;
  checkValidBandNameAndChange: () => void;
};

const ChatInput = (props: ChatInputProps) => {
  const { setInputBandName, checkValidBandNameAndChange } = props;
  return (
    <View style={styles.inputView}>
      <TextInput
        autoFocus={true}
        style={styles.textInput}
        placeholder="Enter band name"
        onChangeText={setInputBandName}
      ></TextInput>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          checkValidBandNameAndChange();
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
