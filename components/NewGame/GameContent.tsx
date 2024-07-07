import { View, Text, StyleSheet } from "react-native";

type GameContentProps = {
  currentBandName: string;
  inputBandName: string;
};

const GameContent = (props: GameContentProps) => {
  const { currentBandName, inputBandName } = props;
  return (
    <View style={styles.gameContent}>
      <Text style={styles.text}>Band name</Text>
      <Text style={styles.text}>{currentBandName}</Text>
      <Text style={styles.text}>{inputBandName}</Text>
    </View>
  );
};

export default GameContent;

const styles = StyleSheet.create({
  gameContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    width: "95%",
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});
