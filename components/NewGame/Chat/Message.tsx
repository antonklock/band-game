import { View, StyleSheet } from "react-native";

type MessageProps = {
  guesser: "player1" | "player2";
  message: string;
  hidden: boolean;
};

import PlayerMessage from "./PlayerMessage";
import OpponentMessage from "./OpponentMessage";

const Message = (props: MessageProps) => {
  const { guesser, message, hidden } = props;
  return (
    <View style={styles.messageView}>
      {guesser === "player1" ? (
        <PlayerMessage message={message} />
      ) : (
        <OpponentMessage hidden={hidden} message={message} />
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageView: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
