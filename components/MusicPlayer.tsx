import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

const music = {
    mainMenu: require("../assets/music/main-menu-music.mp3")
}

export const MusicPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    async function playSound() {
        try {
            console.log("Asset Path:", music.mainMenu);
            const asset = Asset.fromModule(music.mainMenu);
            console.log("Asset:", asset);
            await asset.downloadAsync();
            console.log("Asset Downloaded:", asset);
            const { sound } = await Audio.Sound.createAsync(asset);
            setSound(sound);
            await sound.playAsync();    
        } catch (e) {
            console.log("Error playing sound: ", e);
        }
    }
    
    useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

    return (
        <View style={styles.component}>
            <Text style={styles.text}>Music player</Text>
            <TouchableOpacity style={styles.button} onPress={playSound}>
                <Text>Play</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    component: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white"
    },
    button: {
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        backgroundColor: "blue"
    }
})