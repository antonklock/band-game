import { View, StyleSheet, Text } from "react-native";
import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useGameStore } from "../../stores/gameStore";

export default function WelcomeTicker() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User:", user);
      console.log("User.uid:", user?.uid);
      if (user) setUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.component}>
      {user?.displayName ? (
        //   If the user has a displayName
        <Text>Welcome {user?.displayName}</Text>
      ) : (
        <>
          {user?.email ? (
            //   If the user doesn't have a displayName show their email instead
            <Text>Welcome {user?.email}</Text>
          ) : (
            //   If the user doesn't have an email or displayName show a generic welcome message
            <Text>Welcome to The Band Game!</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    marginTop: 30,
    marginBottom: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#b0f4c6",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
