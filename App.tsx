import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import NewGame from './components/NewGame/NewGame';
import HighScores from './components/HighScores/HighScores';
import OngoingGames from './components/OngoingGames/OngoingGames';
import GameStore from './components/GameStore/GameStore';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewGame" component={NewGame} />
        <Stack.Screen name="HighScores" component={HighScores} />
        <Stack.Screen name="OngoingGames" component={OngoingGames} />
        <Stack.Screen name="GameStore" component={GameStore} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}