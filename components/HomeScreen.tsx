import { View, Text, Button } from "react-native";

export default function HomeScreen({navigation}: {navigation: any}) {
    return (
        <View>
            <Text>This is the HomeScreen!</Text>
            <Button title="Start new game" onPress={() => {
                navigation.navigate('NewGame');
            }}/>
            <Button title="Ongoing Games" onPress={() => {
                navigation.navigate('OngoingGames');
            }}/>
            <Button title="High scores" onPress={() => {
                navigation.navigate('HighScores');
            }}/>
            <Button title="Game Store" onPress={() => {
                navigation.navigate('GameStore');
            }}/>
        </View>
    );
}