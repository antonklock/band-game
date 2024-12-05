import React from "react";
import { View, StyleSheet } from "react-native";
import BandGameBoard from "../GameBoard/BandGameBoard";
import { Client } from "boardgame.io/react-native";
import { BandGame } from "../../game/game";
import { Local } from "boardgame.io/multiplayer";
import BandGameClient from "./BandGameClient";
import { Text } from "react-native";
// export const getPlayerName = (id: string) => {
//   return id === "0" ? "homePlayer" : "awayPlayer";
// };

// const BandGameClient = Client({
//   game: BandGame,
//   board: BandGameBoard,
//   debug: true,
//   multiplayer: Local(),
// });

export default function NewGame({ navigation }: Readonly<{ navigation: any }>) {
  return <BandGameClient playerID="0" />;
}
