// RegisterScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { registerUser } from "../../firebase/auth";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const user = await registerUser(email, password);
      console.log("User registered:", user);
    } catch (error) {
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
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
      />
      <Button title="Register" onPress={handleRegister} />
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
