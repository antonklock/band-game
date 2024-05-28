import { View, Text, Button } from "react-native";

export default function OngoingGames({navigation}: {navigation: any}) {
    return (
        <View>
            <Text>This is the Ongoing Games Screen!</Text>
            <Button title="Home" onPress={() => {
                navigation.navigate('Home');
            }}/>
        </View>
    );
}