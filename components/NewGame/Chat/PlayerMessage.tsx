import { Text, View, StyleSheet } from "react-native";

type PlayerMessageProps = {
  message: string;
  status: "valid" | "invalid" | "validating";
};

const PlayerMessage = (props: PlayerMessageProps) => {
  const { message, status } = props;
  return (
    <View style={styles.messagePosition}>
      {status === "validating" && (
        <View style={styles.validatingMessageView}>
          <Text style={styles.text}>Validating...</Text>
        </View>
      )}
      {status === "valid" && (
        <View style={styles.validMessageView}>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
      {status === "invalid" && (
        <View style={styles.invalidMessageView}>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
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
  validMessageView: {
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
  invalidMessageView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  validatingMessageView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "gray",
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
