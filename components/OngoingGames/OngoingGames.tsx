import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useActiveGameStore } from "../../stores/activeGameStores";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { User } from "firebase/auth";

export default function OngoingGames({ navigation }: { navigation: any }) {
  const games = useActiveGameStore((state) => state.games);

  // TODO: Change to use a store instead of useState
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>This is the Ongoing Games Screen!</Text>
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      {user && (
        <View style={styles.gamesContainer}>
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.gameItem}>
                <Text>Game ID: {item.id}</Text>
                <Text>Home Player: {item.players.homePlayer.name}</Text>
                <Text>Away Player: {item.players.awayPlayer.name}</Text>
                <Text>Current Turn: {item.currentTurn}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  textContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 40,
  },
  gameItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
    flex: 1,
  },
  gamesContainer: {
    flex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    borderRadius: 5,
    padding: 10,
    width: "90%",
  },
});
