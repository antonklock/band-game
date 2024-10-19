import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Strikes from "./PointMarker";
import { GameData } from "../../../types";

type VersusBarProps = {
  game: GameData;
};

const VersusBar = (props: VersusBarProps) => {
  const { game } = props;
  const players = game?.players;

  return (
    <View style={styles.versusBar}>
      <View style={styles.versusView}>
        <Text style={styles.text}>
          {game ? players?.homePlayer.name : "Loading..."}
        </Text>
        <Strikes strikes={game ? players?.homePlayer.strikes : 0} />
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>VS.</Text>
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>
          {game ? players?.awayPlayer.name : "Loading..."}
        </Text>
        <Strikes strikes={game ? players?.awayPlayer.strikes : 0} />
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
