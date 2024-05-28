import { View, Text, Button } from "react-native";

export default function HighScores({navigation}: {navigation: any}) {
    return (
        <View>
            <Text>This is the Highscores Screen!</Text>
            <Button title="Home" onPress={() => {
                navigation.navigate('Home');
            }}/>
        </View>
    );
}