import { View, Text, Button } from "react-native";

export default function NewGame({navigation}: {navigation: any}) {
    return (
        <View>
            <Text>This is the New Game Screen!</Text>
            <Button title="Home" onPress={() => {
                navigation.navigate('Home');
            }}/>
        </View>
    );
}