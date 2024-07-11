import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Keyboard } from "react-native";
import { GameData } from "../../types";
import Message from "./Chat/Message";

type GameContentProps = {
  inputBandName: string;
  gameData: GameData;
};

const GameContent = (props: GameContentProps) => {
  const { gameData } = props;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [gameData.bands]);

  // Move scroll view to the end when keyboard is shown or hidden
  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      if (scrollViewRef.current) {
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
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatArea}>
        {gameData.bands.map((band, index) => {
          return (
            <View style={{ width: "100%" }}>
              {index === gameData.bands.length - 1 &&
                band.guesser === "opponent" && (
                  <Text style={styles.latestGuessText}>
                    Start round to see last message
                  </Text>
                )}
              <Message
                hidden={
                  !gameData.gameStarted && index === gameData.bands.length - 1
                }
                key={index}
                message={band.name}
                guesser={band.guesser}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GameContent;

const styles = StyleSheet.create({
  chatArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    overflow: "scroll",
    width: "100%",
    // backgroundColor: "lightblue",
    flexGrow: 1,
  },
  gameContent: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
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
  latestGuessText: {
    color: "lightgrey",
    fontSize: 9,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
});
