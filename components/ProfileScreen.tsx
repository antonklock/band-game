import { View, Text, Button } from "react-native";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>This is the ProfileScreen!</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <Button
        title="Chat"
        onPress={() => {
          navigation.navigate("Chat");
        }}
      />
    </View>
  );
}
