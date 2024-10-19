import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Message from "./Message";
import { useGameStore } from "../../../stores/gameStore";

// type ChatAreaProps = {
//   gameId: string;
// };

const ChatArea = () => {
  const { game, isLoading, error, loadGame } = useGameStore((state) => ({
    game: state.game,
    isLoading: state.isLoading,
    error: state.error,
    loadGame: state.loadGame,
  }));

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [game?.previousGuesses]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!game) {
    return <Text>No game data available</Text>;
  }

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatArea}>
      {game.previousGuesses.map((band, index) => (
        <View
          key={`chatMessage_${band.name}_${index}`}
          style={{ width: "100%" }}
        >
          {index === game.previousGuesses.length - 1 &&
            band.guesser === "awayPlayer" && (
              <Text
                key={`${band.name}_text_${index}`}
                style={styles.latestGuessText}
              >
                Start round to see last message
              </Text>
            )}
          <Message
            hidden={
              !game.gameStarted && index === game.previousGuesses.length - 1
            }
            message={band.name}
            guesser={band.guesser}
            status={band.status}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    overflow: "scroll",
    width: "100%",
    flexGrow: 1,
  },
  latestGuessText: {
    color: "lightgrey",
    fontSize: 9,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
});

export default ChatArea;
