import React from "react";
import { View, StyleSheet } from "react-native";

type LifeMarkerProps = {
  strikes: 0 | 1 | 2 | 3;
};

const Strikes = (props: LifeMarkerProps) => {
  const { strikes } = props;

  const hasStrike = { ...styles.marker, backgroundColor: "#50ab64" };
  const noStrike = { ...styles.marker, backgroundColor: "#fff" };

  return (
    <View style={styles.container}>
      <View style={strikes > 0 ? hasStrike : noStrike}></View>
      <View style={strikes > 1 ? hasStrike : noStrike}></View>
      <View style={strikes > 2 ? hasStrike : noStrike}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    paddingVertical: 10,
  },
  marker: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 3,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Strikes;
