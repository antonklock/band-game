import { ScrollView, View, Text, StyleSheet } from "react-native";
import Message from "./Message";
import { GameData } from "../../../types";
import { useRef } from "react";

type ChatAreaProps = {
  gameData: GameData;
};

const ChatArea = (props: ChatAreaProps) => {
  const { gameData } = props;
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatArea}>
      {gameData.bands.map((band, index) => {
        return (
          <View key={"chatMessage_" + index} style={{ width: "100%" }}>
            {index === gameData.bands.length - 1 &&
              band.guesser === "opponent" && (
                <Text key={index + "_text"} style={styles.latestGuessText}>
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
