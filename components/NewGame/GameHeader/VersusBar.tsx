import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Strikes from "./PointMarker";
import { useGame } from "../../../hooks/useGame";
import { PlayerStrike } from "../../../types";

type VersusBarProps = {
  gameId: string;
};

const VersusBar = (props: VersusBarProps) => {
  const { gameId } = props;
  const { game, loading } = useGame(gameId);
  const players = game?.players;

  return (
    <View style={styles.versusBar}>
      <View style={styles.versusView}>
        <Text style={styles.text}>
          {loading ? "Loading..." : players?.homePlayer.name}
        </Text>
        <Strikes
          strikes={loading ? 0 : (players?.homePlayer.strikes as PlayerStrike)}
        />
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>VS.</Text>
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>
          {loading ? "Loading..." : players?.awayPlayer.name}
        </Text>
        <Strikes
          strikes={loading ? 0 : (players?.homePlayer.strikes as PlayerStrike)}
        />
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
