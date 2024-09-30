import { searchLastFM } from "../../../api/lastFM/lastFM";
import { logMatchingArtists } from "./logMatchingArtists";
import { useGameStore } from "../../../stores/gameStore";
import { useGame } from "../../../hooks/useGame";
import { GameData } from "../../../types";

const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    lightBlue: "\x1b[94m",
    pink: "\x1b[35m",
};

export const isValidBand = async (band: { name: string, listeners: string }, gameId: string) => {
    try {
        const gameData = useGameStore.getState();
        if (gameData.games.length < 1) throw new Error("Games array is empty!");

        const currentGame = gameData.games.find((game) => game.id === gameId);
        if (!currentGame) throw new Error("Couldn't find game with id: " + gameId);

        const currentBandName = currentGame.currentBandName.trim().toLowerCase();
        const inputBandName = band.name.trim().toLowerCase();

        const inputListeners = parseInt(band.listeners);

        if (inputListeners < 5000) {
            console.log(`${inputBandName} has less than 5000 listeners, skipping validation`);
            return false;
        } else {
            console.log(`${inputBandName} has more than 5000 listeners, validating...`);
        }

        if (inputBandName.length === 0) return false;

        // Check if the guess has already been guessed
        const previousGuessesNames = currentGame.previousGuesses.map((guess) => guess.name);
        if (previousGuessesNames.includes(inputBandName)) return false;

        const inputStartsWithThe = inputBandName.startsWith("the");
        const currentEndsWithT = currentBandName.endsWith("t");

        const processedBandName =
            inputStartsWithThe && !currentEndsWithT
                ? removeWord("the", inputBandName).trim()
                : inputBandName;

        console.log(
            "Validating band name: -->" +
            colors.pink +
            processedBandName +
            colors.reset +
            "<--"
        );

        if (currentBandName.slice(-1) === processedBandName[0] || !currentBandName) {
            const matchingArtists = await searchLastFM(processedBandName);
            return checkIfBandNameExistsInList(matchingArtists, processedBandName);
        } else {
            console.log("currentBandName.slice(-1): " + currentBandName.slice(-1));
            console.log("processedBandName[0]: " + processedBandName[0]);
        }

        return false;
    } catch (error) {
        console.error("Failed to validate band name", error);
        return false;
    }
};

const checkIfBandNameExistsInList = (
    matchingArtists: { name: string, listeners: string }[],
    bandName: string
) => {
    if (matchingArtists.length === 0) {
        console.log(`${bandName} not found on lastFM!`);
        return false;
    }

    const normalizedMatchingArtists = matchingArtists.map((artist) =>
        artist.name.toLowerCase().startsWith("the ") ? artist.name.slice(4) : artist
    );
    const normalizedBandName = bandName.toLowerCase().startsWith("the ")
        ? bandName.slice(4)
        : bandName;

    if (normalizedBandName[0] === normalizedBandName) {
        console.log(`${bandName} is the first result on LastFM`);
        return true;
    }

    if (normalizedMatchingArtists.includes(normalizedBandName)) {
        console.log(`Found a match for ${bandName} in response from lastFM: `);
        logMatchingArtists(matchingArtists.map((artist) => artist.name), normalizedBandName);
        return true;
    }

    console.log(
        `Didn't find a match for ${bandName} in response from LastFM: `
    );
    matchingArtists.forEach((artist) => console.log(artist));
    return false;
};

const removeWord = (wordToRemove: string, bandName: string) => {
    if (
        bandName.substring(0, wordToRemove.length).toLowerCase() === wordToRemove
    ) {
        bandName = bandName.substring(3, bandName.length);
    }
    return bandName;
};

const checkListenersAmount = (listeners: string) => {
    const listenersInt = parseInt(listeners);
    const listenersThreshold = 50000;
    if (listenersInt > listenersThreshold) {
        return true;
    }
    return false;
}
