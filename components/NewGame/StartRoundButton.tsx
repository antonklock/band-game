import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useGameStore } from "../../stores/gameStore";
import { useGame } from "../../hooks/useGame";

type StartRoundButtonProps = {
  gameId: string;
  navigation: any;
};

export default function StartRoundButton(props: StartRoundButtonProps) {
  const { navigation, gameId } = props;

  const game = useGame(gameId).game;

  const isWaitingOnOpponent = () => {
    if (!game) {
      console.error("No game found!");
      return false;
    }
    if (game.bands.length === 0) return false;
    const lastBand = game.bands[game.bands.length - 1];
    if (lastBand.guesser === "awayPlayer") return false;
    return true;
  };

  const handleSetRoundStarted = (newRoundStarted: boolean) => {
    const { updateGame } = useGameStore();
    updateGame(gameId, (game) => {
      game.gameStarted = newRoundStarted;
      return game;
    });
  };

  return (
    <>
      {isWaitingOnOpponent() ? (
        <View style={styles.waitingButtonView}>
          <TouchableOpacity style={styles.waitingButton} disabled={true}>
            <Text style={styles.text}>Waiting for opponent to answer...</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.readyButtonView}>
          <Text style={styles.text}>Ready to play?</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              handleSetRoundStarted(true);
            }}
          >
            <Text style={styles.text}>{"Yes"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.text}>{"No"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  waitingButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    height: 60,
    width: "90%",
    borderRadius: 10,
  },
  readyButtonView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 40,
    height: 200,
    width: "90%",
    backgroundColor: "#50ab64",
    borderRadius: 10,
  },
  startButton: {
    borderRadius: 10,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 30,
  },
  waitingButton: {
    backgroundColor: "darkgrey",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
