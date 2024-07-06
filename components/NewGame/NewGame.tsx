import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CountDown from "./CountDown";
import { useState } from "react";

export default function NewGame({ navigation }: { navigation: any }) {
  const [currentBandName, setCurrentBandName] = useState("The Cardigans");
  const [inputBandName, setInputBandName] = useState("");

  const checkValidBandNameAndChange = () => {
    if (
      currentBandName[currentBandName.length - 1].toLowerCase() ===
      inputBandName[0].toLowerCase()
    ) {
      // If it does, update current band name
      setCurrentBandName(inputBandName);
      // Reset input band name
      setInputBandName("");

      console.log("Valid band name");
    } else {
      console.log("Invalid band name");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.gameHeader}>
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Text style={styles.heading}>
          This is the <Text style={{ color: "yellow" }}>New Game</Text> Screen!
        </Text>
        <Text style={styles.text}>Countdown</Text>
        <CountDown countdownTime={20} />
      </View>
      <View style={styles.gameContent}>
        <Text style={styles.text}>Band name</Text>
        <Text style={styles.text}>{currentBandName}</Text>
        <Text style={styles.text}>{inputBandName}</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 40,
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
  },
  gameContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
});
