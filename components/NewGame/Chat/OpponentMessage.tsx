import { Text, View, StyleSheet } from "react-native";

type OpponentMessageProps = {
  message: string;
  hidden: boolean;
};

const OpponentMessage = (props: OpponentMessageProps) => {
  const { message, hidden } = props;
  return (
    <>
      {hidden ? (
        <View style={styles.messagePosition}>
          <View style={styles.messageView}>
            <View style={styles.writingMessage}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.messagePosition}>
          <View style={styles.messageView}>
            <Text style={styles.text}>{message}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default OpponentMessage;

const styles = StyleSheet.create({
  writingMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "darkgreen",
    borderRadius: 50,
  },
  messagePosition: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    color: "black",
  },
  messageView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "lightgreen",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
