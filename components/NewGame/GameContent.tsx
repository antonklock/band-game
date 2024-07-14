import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import { GameData } from "../../types";
import ChatArea from "./Chat/ChatArea";

type GameContentProps = {
  inputBandName: string;
  gameData: GameData;
};

const GameContent = (props: GameContentProps) => {
  const { gameData } = props;
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to the end of the chat when a new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [gameData.bands]);

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
      <ChatArea gameData={gameData} />
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
