import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type StartRoundButtonProps = {
  setRoundStarted: (roundStarted: boolean) => void;
  navigation: any;
  waiting: boolean;
};

export default function StartRoundButton(props: StartRoundButtonProps) {
  const { setRoundStarted, waiting, navigation } = props;
  return (
    <>
      {waiting ? (
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
              setRoundStarted(true);
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
