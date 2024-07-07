import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameData } from "../../types";
import Message from "./Chat/Message";

type GameContentProps = {
  inputBandName: string;
  gameData: GameData;
};

const GameContent = (props: GameContentProps) => {
  const { gameData } = props;
  return (
    <View style={styles.gameContent}>
      <View style={styles.chatArea}>
        {gameData.bands.map((band, index) => {
          return (
            <>
              {index === gameData.bands.length - 1 && (
                <Text
                  style={{
                    ...styles.latestGuessText,
                    alignSelf:
                      band.guesser === "player1" ? "flex-end" : "flex-start",
                  }}
                >
                  This is the latest entry
                </Text>
              )}
              <Message
                hidden={!gameData.gameStarted}
                key={index}
                message={band.name}
                guesser={band.guesser}
              />
            </>
          );
        })}
      </View>
    </View>
  );
};

export default GameContent;

const styles = StyleSheet.create({
  chatArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    overflow: "scroll",
    width: "100%",
    // backgroundColor: "lightblue",
    flex: 1,
  },
  gameContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    width: "95%",
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
  latestGuessText: {
    color: "lightgrey",
    fontSize: 9,
    paddingHorizontal: 20,
  },
});
