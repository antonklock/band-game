import { Button } from 'react-native';
import Sound from 'react-native-sound'

Sound.setCategory('Playback');

export default function BackgroundMusic() {
    const music = new Sound('/assets/music/8bit-placeholder.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        music.setNumberOfLoops(-1);
    })
    return (
        <>
            <p>
            Background Music
            </p>
            <Button title="Toggle music" onPress={() => music.isPlaying() ? music.pause() : music.play()} />
        </>
    );
}