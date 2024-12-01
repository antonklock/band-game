import { View, StyleSheet, Text } from "react-native";
import NavButton from "./Menu/NavButton";
import WelcomeTicker from "./Menu/WelcomeTicker";
import HomeLogo from "./Menu/HomeLogo";
import React from "react";
import FooterMenu from "./FooterMenu/FooterMenu";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
// import { subscribeToGames } from "../stores/activeGamesStore";

export default function HomeScreen({ navigation }: { navigation: any }) {
  // TODO: Change to use a store instead of useState
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.component}>
      <View style={styles.welcome}>
        <WelcomeTicker />
      </View>
      <View style={styles.image}>
        <HomeLogo />
      </View>
      {!user && (
        <View style={styles.loginButtons}>
          <Text style={styles.text}>Please login to play</Text>
          <NavButton
            icon={"highscores"}
            title={"Login"}
            navigation={navigation}
            navigateTo="Login"
          />
        </View>
      )}
      {user && (
        <>
          <View style={styles.buttons}>
            <NavButton
              title={"Start new game"}
              navigation={navigation}
              navigateTo="NewGame"
              icon="start-new-game"
            />
            <NavButton
              title={"Ongoing Games"}
              navigation={navigation}
              navigateTo="OngoingGames"
              icon="ongoing-games"
            />
            <NavButton
              title={"High scores"}
              navigation={navigation}
              navigateTo="HighScores"
              icon="highscores"
            />
            <NavButton
              title={"Game Store"}
              navigation={navigation}
              navigateTo="GameStore"
              icon="game-store"
            />
          </View>
        </>
      )}
      <FooterMenu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
  },
  welcome: {
    width: "90%",
  },
  image: {
    width: "90%",
    height: "30%",
  },
  buttons: {
    width: "90%",
  },
  loginButtons: {
    width: "90%",
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    color: "white",
  },
});
