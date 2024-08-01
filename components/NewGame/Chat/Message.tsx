import { View, StyleSheet } from "react-native";

type MessageProps = {
  guesser: GuesserType;
  message: string;
  hidden: boolean;
  status: "valid" | "invalid" | "validating";
};

import PlayerMessage from "./PlayerMessage";
import OpponentMessage from "./OpponentMessage";
import { GuesserType } from "../../../types";

const Message = (props: MessageProps) => {
  const { guesser, message, hidden, status } = props;
  return (
    <View style={styles.messageView}>
      {guesser === "homePlayer" ? (
        <PlayerMessage message={message} status={status} />
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
