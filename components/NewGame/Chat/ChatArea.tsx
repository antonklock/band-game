import { ScrollView, View, Text, StyleSheet } from "react-native";
import Message from "./Message";
import { useRef, useEffect } from "react";
import { useGameStore } from "../../../stores/gameStore";
import { useGame } from "../../../hooks/useGame";

type ChatAreaProps = {
  gameId: string;
};

const ChatArea = (props: ChatAreaProps) => {
  const { gameId } = props;
  const gameData = useGame(gameId);
  const game = gameData.game;

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [game?.previousGuesses]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatArea}>
      {game?.previousGuesses.map((band, index) => {
        return (
          <View key={"chatMessage_" + index} style={{ width: "100%" }}>
            {index === game?.previousGuesses.length - 1 &&
              band.guesser === "awayPlayer" && (
                <Text key={index + "_text"} style={styles.latestGuessText}>
                  Start round to see last message
                </Text>
              )}
            <Message
              hidden={
                !game.gameStarted && index === game.previousGuesses.length - 1
              }
              key={index}
              message={band.name}
              guesser={band.guesser}
              status={band.status}
            />
          </View>
        );
      })}
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
