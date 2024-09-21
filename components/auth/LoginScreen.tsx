import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { loginUser } from "../../firebase/auth";
import GoogleLogin from "./GoogleLogin";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      console.log("User logged in:", user);
      navigation.navigate("Home");
    } catch (error) {
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleLogin navigation={navigation} />
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /> */}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Back" onPress={() => navigation.navigate("Home")} />
      {error && <Text style={styles.text}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
  },
  input: {
    width: 200,
    height: 40,
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});
