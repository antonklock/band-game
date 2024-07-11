import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type CountDownProps = {
  roundStarted: boolean;
  countdownTime: number;
};

export default function CountDown(props: CountDownProps) {
  const { countdownTime, roundStarted } = props;
  const [countdown, setCountdown] = useState(countdownTime);

  const countdownTimer: NodeJS.Timeout = setTimeout(() => {
    if (!roundStarted) return clearTimeout(countdownTimer);
    if (countdown < 0) return clearTimeout(countdownTimer);
    setCountdown(countdown - 1);
  }, 1000);
  return (
    <View style={styles.container}>
      {countdown > 0 && countdown >= 6 && (
        <Text style={{ ...styles.countdownText, color: "white" }}>
          {countdown}
        </Text>
      )}
      {countdown < 6 && countdown >= 3 && (
        <Text style={{ ...styles.countdownText, color: "yellow" }}>
          {countdown}
        </Text>
      )}
      {countdown < 3 && countdown >= 0 && (
        <Text style={{ ...styles.countdownText, color: "red" }}>
          {countdown}
        </Text>
      )}
      {countdown < 0 && (
        <Text style={{ ...styles.countdownText, color: "red" }}>
          Time's up!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
