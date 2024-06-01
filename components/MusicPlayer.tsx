import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const menuMusic = require("../assets/music/main-menu-music_short.mp3");

const MusicPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    async function playSound() {
        try {
            // Verify if the file exists
            const fileUri = FileSystem.documentDirectory + 'main-menu-music.mp3';
            const info = await FileSystem.getInfoAsync(fileUri);
            console.log("File exists:", info.exists);

            console.log("Loading sound...");
            const { sound } = await Audio.Sound.createAsync(menuMusic);
            console.log("Sound loaded:", sound);
            setSound(sound);
            await sound.playAsync();
            console.log("Sound playing");
        } catch (e) {
            console.error("Error playing sound:", e);
        }
    }

    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
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

export default MusicPlayer;