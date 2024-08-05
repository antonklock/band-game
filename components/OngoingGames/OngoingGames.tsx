import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { User } from "firebase/auth";
import { getRandomBandName } from "../../utils/GameAI/exampleBandNames";
import { useGameList } from "../../hooks/useGameList";
import { useGameStore } from "../../stores/gameStore";

export default function OngoingGames({ navigation }: { navigation: any }) {
  const games = useGameList();
  const { updateGame, removeGame } = useGameStore();

  // TODO: Change to use a store instead of useState
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleRemoveGame = (gameId: string) => {
    removeGame(gameId);
  };

  const handleUpdateGame = (gameId: string) => {
    updateGame(gameId, (game) => ({
      ...game,
      currentBandName: getRandomBandName(),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ color: "white" }}>
          This is the Ongoing Games Screen!
        </Text>
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      {user && (
        <>
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
                  <Text>Current Band Name: {item.currentBandName}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveGame(item.id)}
                    style={{
                      ...styles.addNewGameButton,
                      backgroundColor: "red",
                    }}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.addNewGameButton,
                      backgroundColor: "yellow",
                    }}
                    onPress={() => handleUpdateGame(item.id)}
                  >
                    <Text style={{ color: "black" }}>Update Game</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </>
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
  removeGameButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addNewGameButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
