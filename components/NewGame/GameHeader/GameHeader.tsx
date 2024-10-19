import { Button, Text, View, StyleSheet } from "react-native";
import CountDown from "./CountDown";
import VersusBar from "./VersusBar";
import { useGameStore } from "../../../stores/gameStore";

type GameHeaderProps = {
  navigation: any;
};

const GameHeader = (props: GameHeaderProps) => {
  const game = useGameStore((state) => state.game);
  const { navigation } = props;

  if (!game) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const roundStarted = game.gameStarted;

  return (
    <View style={styles.gameHeader}>
      <VersusBar game={game} />
      {roundStarted && (
        <>
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
        </>
      )}
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
