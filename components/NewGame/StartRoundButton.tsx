import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type StartRoundButtonProps = {
  setRoundStarted: (roundStarted: boolean) => void;
  waiting: boolean;
};

export default function StartRoundButton(props: StartRoundButtonProps) {
  const { setRoundStarted, waiting } = props;
  return (
    <>
      {waiting ? (
        <View style={styles.readyButtonView}>
          <TouchableOpacity style={styles.waitingButton} disabled={true}>
            <Text style={styles.text}>Waiting for opponent to answer...</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.readyButtonView}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setRoundStarted(true);
            }}
          >
            <Text style={styles.text}>Start round</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  readyButtonView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: "#50ab64",
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
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 30,
  },
  text: {
    color: "white",
  },
});
