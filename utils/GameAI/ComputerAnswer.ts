import { searchLastFM } from "../../api/lastFM/lastFM";
import { useActiveGamesStore } from "../../stores/activeGamesStore";
import { Band, BandStatus } from "../../types";
import { getAiResponse } from "./GameAiPlayer";
import uuid from "react-native-uuid";

const runComputerGuess = async (gameId: string) => {
    // const gameData = useActiveGamesStore.getState().games[0];
    const gameData = useActiveGamesStore.getState().games.find((game) => game.id === gameId);

    if (!gameData) return console.error("Game not found - please check the game ID");

    const lastBand = gameData.bands[gameData.bands.length - 1];

    if (lastBand.guesser === "homePlayer" && lastBand.status === "valid") {
        const randomTimeoutTime = Math.floor(Math.random() * 6000) + 1000;

        const fetchAndAddBand = async () => {
            try {
                const lastLetter = gameData.currentBandName.slice(-1);
                const searchResults = await searchLastFM(lastLetter);

                let newBand = "";
                for (
                    let i = Math.floor(Math.random() * searchResults.length);
                    i < searchResults.length;
                    i++
                ) {
                    if (searchResults[i][0] === lastLetter) {
                        newBand = searchResults[i];

                        newBand = newBand
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");

                        console.log("New band: ", newBand);

                        const guessId = uuid.v4() as string;


                        const newBandData: Band = {
                            name: newBand,
                            guesser: "awayPlayer",
                            status: "valid",
                            guessId,
                            setStatus: (status: BandStatus) => { }
                        }

                        useActiveGamesStore.getState().updateGame(gameData.id, (game) => ({ ...gameData, currentBandName: newBand, bands: [...gameData.bands, newBandData] }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch new band", error);
            }
        };

        const timeoutId = setTimeout(() => {
            if (gameData.currentBandName) {
                return fetchAndAddBand();
            } else {
                return getAiResponse();
            }
        }, randomTimeoutTime);

        return () => clearTimeout(timeoutId);
    }
};

export { runComputerGuess };