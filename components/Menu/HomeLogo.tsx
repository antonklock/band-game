import { Image, StyleSheet, View } from "react-native";

export default function WelcomeTicker() {
    return (
        <View style={styles.component}>
            <Image style={styles.logo} source={require("../../assets/images/icons/band-game-logo.png")} />
            <Image style={styles.background} source={require("../../assets/images/start-background.png")} />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        borderRadius: 10
    },
    logo: {
        width: 50,
        height: 100,
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 1,
        overflow: "visible"
    }
})