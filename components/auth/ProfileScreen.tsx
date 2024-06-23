import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { logoutUser } from "../../firebase/auth";
import { auth } from "../../firebaseConfig";

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
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
