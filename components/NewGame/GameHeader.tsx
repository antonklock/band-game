import { Button, Text, View, StyleSheet } from "react-native";
import CountDown from "./CountDown";

type GameHeaderProps = {
  navigation: any;
  roundStarted: boolean;
};

const GameHeader = (props: GameHeaderProps) => {
  const { navigation, roundStarted } = props;
  return (
    <View style={styles.gameHeader}>
      <View style={styles.versusBar}>
        <View style={styles.versusView}>
          <Text style={styles.text}>You</Text>
        </View>
        <View style={styles.versusView}>
          <Text style={styles.text}>VS.</Text>
        </View>
        <View style={styles.versusView}>
          <Text style={styles.text}>Opponent</Text>
        </View>
      </View>
      <View style={styles.navBar}>
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <Text style={styles.text}>Countdown</Text>
      <CountDown roundStarted={roundStarted} countdownTime={20} />
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({
  gameHeader: {
    marginTop: 20,
    display: "flex",
    gap: 4,
    alignItems: "center",
    paddingTop: 40,
    marginHorizontal: 20,
  },
  versusBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  versusView: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  text: {
    color: "white",
  },
  navBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});
