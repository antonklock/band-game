import { View, Text, Button, StyleSheet } from "react-native";
import { logoutUser } from "../../../firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function AccountScreen({ navigation }: { navigation: any }) {
  // TODO: Change to use a store instead of useState
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.component}>
      <Text style={styles.heading}>This is the Account screen!</Text>
      {user && <Text style={styles.text}>Welcome {user.email}</Text>}
      {user && <Button title="Logout" onPress={handleLogout} />}
      <View style={styles.buttons}>
        {!user && (
          <>
            <Button
              title="Login"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
            <Button
              title="Register"
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </>
        )}

        <Button
          title="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
