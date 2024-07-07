import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type StartRoundButtonProps = {
  setRoundStarted: (roundStarted: boolean) => void;
};

export default function StartRoundButton(props: StartRoundButtonProps) {
  const { setRoundStarted } = props;
  return (
    <View style={styles.readyButtonView}>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          setRoundStarted(true);
        }}
      >
        <Text style={styles.text}>Start round</Text>
      </TouchableOpacity>
    </View>
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
  submitButton: {
    backgroundColor: "#50ab64",
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
