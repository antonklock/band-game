import { bands } from './exampleBandNames';
import { searchLastFM } from '../../api/lastFM/lastFM';
import { useGameStore } from '../../stores/gameStore';

type BandKeys = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

const getBandName = (letter: BandKeys, ignoreList: string[]) => {
    const bandNames = bands[letter].filter(bandName => !ignoreList.includes(bandName));
    const newBand = bandNames[Math.floor(Math.random() * bandNames.length)];

    if (!newBand) return null;
    return newBand;
}

const getAiResponse = () => {
    const currentBandName = useGameStore((state) => state.currentBandName);
    const currentBandNameLength = currentBandName.length;
    const lastLetter = currentBandName[currentBandNameLength - 1].toUpperCase();
    const ignoreList = useGameStore((state) => state.bands.map(band => band.name));

    if (!lastLetter) return null;
    const newBand = getBandName(lastLetter as BandKeys, ignoreList);

    if (!newBand) return null;
    return newBand;
}

const getAiResponseFromLastFM = async () => {
    const currentBandName = useGameStore((state) => state.currentBandName);
    const currentBandNameLength = currentBandName.length;
    const lastLetter = currentBandName[currentBandNameLength - 1].toUpperCase();

    // TODO: Add ignore list to not get the same band name twice
    const newBand = await searchLastFM(lastLetter);

    if (!newBand) return null;
    return newBand;
}

export { getAiResponse, getAiResponseFromLastFM };