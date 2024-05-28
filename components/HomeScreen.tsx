import { View, Text, Button } from "react-native";

export default function HomeScreen({navigation}: {navigation: any}) {
    return (
        <View>
            <Text>This is the HomeScreen!</Text>
            <Button title="Profile" onPress={() => {
                navigation.navigate('Profile');
            }}/>
            <Button title="Chat" onPress={() => {
                navigation.navigate('Chat');
            }}/>
        </View>
    );
}