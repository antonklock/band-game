import { View, Text, Button } from "react-native";

export default function GameStore({navigation}: {navigation: any}) {
    return (
        <View>
            <Text>This is the Gamestore Screen!</Text>
            <Button title="Home" onPress={() => {
                navigation.navigate('Home');
            }}/>
        </View>
    );
}