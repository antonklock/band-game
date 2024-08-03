import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Strikes from "./PointMarker";
import { useGameStore } from "../../../stores/gameStore";
import { useActiveGamesStore } from "../../../stores/activeGamesStore";
import { PlayerStrike } from "../../../types";

type VersusBarProps = { gameId: string | undefined };

const VersusBar = (props: VersusBarProps) => {
  const { gameId } = props;
  const gameData = useActiveGamesStore
    .getState()
    .games.find((game) => game.id === gameId);
  // const { homePlayer: player, awayPlayer: opponent } = gameData?.players;
  // const player = gameData?.players.homePlayer;
  // const opponent = gameData?.players.awayPlayer;
  // const { homePlayer: player, awayPlayer: opponent } = useGameStore(
  //   (state) => state.players
  // );

  const playerName = gameData?.players.homePlayer.name;
  const opponentName = gameData?.players.awayPlayer.name;
  const playerStrikes = gameData?.players.homePlayer.strikes;
  const opponentStrikes = gameData?.players.awayPlayer.strikes;

  let pStrikes: PlayerStrike = 0;
  let oStrikes: PlayerStrike = 0;
  if (playerStrikes) {
    pStrikes = playerStrikes;
  }
  if (opponentStrikes) {
    oStrikes = opponentStrikes;
  }

  // const { name: playerName } = player;
  // const { name: opponentName } = opponent;
  // const { strikes: playerStrikes } = player;
  // const { strikes: opponentStrikes } = opponent;
  return (
    <View style={styles.versusBar}>
      <View style={styles.versusView}>
        <Text style={styles.text}>{playerName}</Text>
        <Strikes strikes={pStrikes} />
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>VS.</Text>
      </View>
      <View style={styles.versusView}>
        <Text style={styles.text}>{opponentName}</Text>
        <Strikes strikes={oStrikes} />
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
