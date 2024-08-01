import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Strikes from "./PointMarker";
import { useGameStore } from "../../../stores/gameStore";

const VersusBar = () => {
  const { homePlayer: player, awayPlayer: opponent } = useGameStore(
    (state) => state.players
  );
  const { name: playerName } = player;
  const { name: opponentName } = opponent;
  const { strikes: playerStrikes } = player;
  const { strikes: opponentStrikes } = opponent;
  return (
    <View style={styles.versusBar}>
      <View style={styles.versusView}>
        <Text style={styles.text}>{playerName}</Text>
        <Strikes strikes={playerStrikes} />
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>VS.</Text>
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>{opponentName}</Text>
        <Strikes strikes={opponentStrikes} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  versusBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  versusView: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "#50ab64",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VersusBar;
