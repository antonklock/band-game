import { StatusBar } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/auth/ProfileScreen";
import ChatScreen from "./components/ChatScreen";
import NewGame from "./components/NewGame/NewGame";
import HighScores from "./components/HighScores/HighScores";
import OngoingGames from "./components/OngoingGames/OngoingGames";
import GameStore from "./components/GameStore/GameStore";

import RegisterScreen from "./components/auth/RegisterScreen";
import LoginScreen from "./components/auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#1E1E1E" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewGame" component={NewGame} />
          <Stack.Screen name="HighScores" component={HighScores} />
          <Stack.Screen name="OngoingGames" component={OngoingGames} />
          <Stack.Screen name="GameStore" component={GameStore} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
