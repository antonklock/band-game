import { useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { GameData } from "../../types";
import { searchLastFM } from "../../api/lastFM/lastFM";

type ChatInputProps = {
  gameData: GameData;
  setInputBandName: (inputBandName: string) => void;
  inputBandName: string;
  handleAddNewBand: (bandName: string, player: "player" | "opponent") => void;
};

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  darkGray: "\x1b[90m",
  red: "\x1b[31m",
};

const ChatInput = (props: ChatInputProps) => {
  const { setInputBandName, inputBandName, gameData, handleAddNewBand } = props;

  const inputRef = useRef<TextInput>(null);
  const [theWord, setTheWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [isCorrectLetter, setIsCorrectLetter] = useState(false);

  const startsWithThe = (inputString: string) => {
    const lowercaseInput = inputString.toLowerCase();
    return (
      lowercaseInput.startsWith("t") ||
      lowercaseInput.startsWith("th") ||
      lowercaseInput.startsWith("the") ||
      lowercaseInput.startsWith("the ")
    );
  };

  useEffect(() => {
    const currentBandNameLastLetter =
      gameData.currentBandName[
        gameData.currentBandName.length - 1
      ].toLowerCase();
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

  // Validate band name
  const isValidBandName = async (bandName: string) => {
    const currentBandName = gameData.currentBandName.trim().toLowerCase();
    const currentBandNameLength = currentBandName.length;
    if (bandName.length === 0) return false;
    bandName = bandName.trim().toLowerCase();

    // If the input name starts with "the" and currentBandName doesn't end with t, remove 'the'
    const inputStartsWithThe = bandName.substring(0, 3) === "the";
    const currentEndsWithT =
      currentBandName[currentBandNameLength - 1] === "t" ||
      currentBandName[currentBandNameLength - 1] === "T";
    bandName =
      inputStartsWithThe && !currentEndsWithT
        ? removeWord("the", bandName)
        : bandName;
    bandName = bandName.trim();

    console.log(
      "Validating band name: -->" + colors.red + bandName + colors.reset + "<--"
    );

    if (currentBandName[currentBandNameLength - 1] === bandName[0]) {
      const bandList = await searchLastFM(bandName);
      return await checkIfBandNameExistsInList(bandList, bandName);
    } else {
      return false;
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const checkIfBandNameExistsInList = async (
    bandList: String[],
    bandName: string
  ) => {
    if (bandList.length === 0) {
      console.log(`${bandName} not found on lastFM!`);
      return false;
    } else if (bandName === bandList[0]) {
      console.log("Band is top result on lastFM!");

      const bandListLower = bandList.map((band) => band.toLowerCase());

      bandList.forEach((band) => {
        if (bandListLower.indexOf(band.toLowerCase()) === 0) {
          console.log(colors.green + "----->", band, colors.reset);
        } else {
          console.log(colors.darkGray + band, colors.reset);
        }
      });

      return true;
    } else {
      const bandListLowerNoThe = bandList.map((band) => {
        if (band.substring(0, 3).toLowerCase() === "the") {
          return band.substring(3, band.length).toLowerCase();
        } else {
          return band.toLowerCase();
        }
      });

      if (bandListLowerNoThe.includes(bandName.toLowerCase())) {
        console.log(`Found a match for ${bandName} in response from lastFM:`);

        bandListLowerNoThe.forEach((band) => {
          if (
            bandListLowerNoThe.indexOf(band.toLowerCase()) ===
            bandListLowerNoThe.indexOf(bandName.toLowerCase())
          ) {
            console.log(colors.green + "----->", band, colors.reset);
          } else {
            console.log(colors.darkGray + band, colors.reset);
          }
        });
        return true;
      } else {
        console.log(
          `Found no exact match for ${bandName} in response from lastFM:`
        );
        bandList.forEach((band) => {
          console.log(band);
        });
        return false;
      }
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

  const handleNewGuess = async (guessBandName: string) => {
    if (guessBandName.length === 0) return;
    guessBandName.trim();
    const bandNameIsValid = await isValidBandName(guessBandName);
    if (!bandNameIsValid) return handleInvalidGuess();

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
