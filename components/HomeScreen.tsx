import { View, StyleSheet } from "react-native";
import NavButton from "./Menu/NavButton";
import WelcomeTicker from "./Menu/WelcomeTicker";
import HomeLogo from "./Menu/HomeLogo";
import { MusicPlayer } from "./MusicPlayer";

export default function HomeScreen({navigation}: {navigation: any}) {
    return (
        <View style={styles.component}>
            <View style={styles.welcome}>
                <WelcomeTicker />
            </View>
            <View style={styles.image}>
                <HomeLogo />
            </View>
            <View style={styles.buttons}>
                <NavButton title={"Start new game"} navigation={navigation} navigateTo="NewGame" icon="start-new-game"/>
                <NavButton title={"Ongoing Games"} navigation={navigation} navigateTo="OngoingGames" icon="ongoing-games"/>
                <NavButton title={"High scores"} navigation={navigation} navigateTo="HighScores" icon="highscores" />
                <NavButton title={"Game Store"} navigation={navigation} navigateTo="GameStore" icon="game-store" />
            </View>
            <MusicPlayer />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        paddingTop: 50,
        flex: 1,
        alignItems: "center"
    },
    welcome: {
        width: "90%",
    },
    image: {
        width: "90%",
        height: "30%",
    },
    buttons: {
        width: "90%"
    }
});