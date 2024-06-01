import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';

export const MusicPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    async function playSound() {
        console.log('Loading Sound');

        try {
            const { sound } = await Audio.Sound.createAsync(require("../assets/music/main-menu-music.mp3"));
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();
        } catch (error) {
            console.log('Error playing sound', error);
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