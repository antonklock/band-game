import React from "react";
import { View } from "react-native";
import BandGameBoard from "../GameBoard/BandGameBoard";
import { Client } from "boardgame.io/react-native";
import { BandGame } from "../../game/game";
import { Local } from "boardgame.io/multiplayer";

export const getPlayerName = (id: string) => {
  return id === "0" ? "homePlayer" : "awayPlayer";
};

const BandGameClient = Client({
  game: BandGame,
  board: BandGameBoard,
  debug: true,
  multiplayer: Local(),
});

export default function NewGame({ navigation }: Readonly<{ navigation: any }>) {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <BandGameClient playerID="0" />
      </View>
      <View style={{ flex: 1 }}>
        <BandGameClient playerID="1" />
      </View>
    </View>
  );
}
