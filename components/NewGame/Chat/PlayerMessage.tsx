import { Text, View, StyleSheet } from "react-native";

type PlayerMessageProps = {
  message: string;
};

const PlayerMessage = (props: PlayerMessageProps) => {
  const { message } = props;
  return (
    <View style={styles.messagePosition}>
      <View style={styles.messageView}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

export default PlayerMessage;

const styles = StyleSheet.create({
  messagePosition: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
  },
  messageView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "green",
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
