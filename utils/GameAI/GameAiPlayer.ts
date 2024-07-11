import { bands } from './exampleBandNames.js';
import { GameData } from "../../types.js";

type BandKeys = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

const getBandName = (letter: BandKeys, ignoreList: string[]) => {
    const bandNames = bands[letter].filter(bandName => !ignoreList.includes(bandName));
    const newBand = bandNames[Math.floor(Math.random() * bandNames.length)];

    if (!newBand) return null;
    return newBand;
}

const getAiResponse = (gameData: GameData) => {
    const currentBandName = gameData.currentBandName;
    const currentBandNameLength = currentBandName.length;
    const lastLetter = currentBandName[currentBandNameLength - 1].toUpperCase();
    const ignoreList = gameData.bands.map(band => band.name);

    const newBand = getBandName(lastLetter as BandKeys, ignoreList);

    if (!newBand) return null;
    return newBand;
}

export { getAiResponse };