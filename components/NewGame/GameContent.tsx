import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Keyboard, Text } from "react-native";
import ChatArea from "./Chat/ChatArea";
import { useGameStore } from "../../stores/gameStore";

const GameContent = () => {
  const game = useGameStore((state) => state.game);

  if (!game) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>No game data available</Text>
      </View>
    );
  }

  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to the end of the chat when a new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [game.previousGuesses]);

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
      <ChatArea />
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
