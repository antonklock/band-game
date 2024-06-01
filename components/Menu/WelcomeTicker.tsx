import { View, StyleSheet, Text } from "react-native";

export default function WelcomeTicker() {
    return (
        <View style={styles.component}>
            <Text>Ticker Welcome</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        marginTop: 30,
        marginBottom: 10,
        width: "100%",
        height: 40,
        backgroundColor: "#b0f4c6",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})