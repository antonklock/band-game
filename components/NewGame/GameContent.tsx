import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import ChatArea from "./Chat/ChatArea";
import { useGameStore } from "../../stores/gameStore";

type GameContentProps = {
  gameId: string;
};

const GameContent = (props: GameContentProps) => {
  const { gameId } = props;
  const gameData = useGameStore.getState();
  if (gameData.games.length < 1) throw new Error("Games array is empty!");

  const currentGame = gameData.games.find((game) => game.id === gameId);
  if (!currentGame) throw new Error("Couldn't find game with id: " + gameId);

  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to the end of the chat when a new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [currentGame.previousGuesses]);

  // Add listeners for keyboard show and hide
  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", () => {
      if (scrollViewRef.current) {
        // Move scroll view to the end when keyboard is shown or hidden
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      if (scrollViewRef.current) {
        // Move scroll view to the end when keyboard is shown or hidden
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  return (
    <View style={styles.gameContent}>
      <ChatArea gameId={gameId} />
    </View>
  );
};

export default GameContent;

const styles = StyleSheet.create({
  gameContent: {
    display: "flex",
    flexDirection: "column",
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
