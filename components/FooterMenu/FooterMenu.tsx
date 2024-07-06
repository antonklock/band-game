import { View, Text, Button, StyleSheet } from "react-native";

export default function FooterMenu({ navigation }: { navigation: any }) {
  return (
    <View style={styles.component}>
      <Button
        title="Settings"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      />
      <Button
        title="Account"
        onPress={() => {
          navigation.navigate("Account");
        }}
      />
      <Button
        title="Rules"
        onPress={() => {
          navigation.navigate("Rules");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    paddingTop: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 60,
  },
});
