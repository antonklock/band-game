import { View, Text, Button, StyleSheet } from "react-native";

export default function RulesScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.component}>
      <Text style={styles.text}>This is the Rules screen!</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    paddingTop: 50,
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
  },
});
