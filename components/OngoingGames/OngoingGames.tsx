import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useActiveGameStore } from "../../stores/activeGamesStore";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { User } from "firebase/auth";
import { getRandomBandName } from "../../utils/GameAI/exampleBandNames";

export default function OngoingGames({ navigation }: { navigation: any }) {
  // const games = useActiveGameStore((state) => state.games);
  // const removeGame = useActiveGameStore((state) => state.removeGame);
  // const addGame = useActiveGameStore((state) => state.addGame);

  const { games, removeGame, addGame } = useActiveGameStore();

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

  const handleAddGame = () => {
    addGame({
      id: "",
      players: {
        homePlayer: { id: "123", name: "Home Player", score: 0, strikes: 0 },
        awayPlayer: { id: "456", name: "Away Player", score: 0, strikes: 0 },
      },
      bands: [],
      currentBandName: getRandomBandName(),
      inputBandName: "Input Band Name",
      gameStarted: false,
      currentTurn: "homePlayer",
    });
  };

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
                    style={styles.removeGameButton}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.addNewGameButton}
              onPress={handleAddGame}
            >
              <Text style={{ color: "white" }}>Add New Game</Text>
            </TouchableOpacity>
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
