import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameData } from "../../types";

type GameContentProps = {
  inputBandName: string;
  gameData: GameData;
};

const GameContent = (props: GameContentProps) => {
  const { inputBandName, gameData } = props;
  return (
    <View style={styles.gameContent}>
      <Text style={styles.text}>Band name list</Text>
      {gameData.bands.map((band, index) => {
        return (
          <Text style={styles.text} key={index}>
            {band.name}
          </Text>
        );
      })}
      <Text style={{ ...styles.text, marginTop: 20 }}>Current Band name</Text>
      <Text style={styles.text}>{gameData.currentBandName}</Text>
      <Text style={{ ...styles.text, marginTop: 20 }}>Your guess</Text>
      <Text style={styles.text}>{inputBandName}</Text>
    </View>
  );
};

export default GameContent;

const styles = StyleSheet.create({
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
});
