import { Band, BandStatus, GuesserType } from "../types";
import { useActiveGamesStore } from "./activeGamesStore";
import { useGameStore } from "./gameStore";

const setGameState = useGameStore.setState;

const addNewBandToGameStore = (
    bandProps: {
        name: string,
        guesser: GuesserType,
        guessId: string,
        gameId: string
    },
    status: BandStatus = "validating",
) => {
    const { name, guesser, guessId } = bandProps;
    const band: Band = {
        name,
        guesser,
        status,
        guessId,
        setStatus: (status: BandStatus) => {
            setGameState((state) => ({
                bands: state.bands.map((band) =>
                    band.guessId === guessId ? { ...band, status } : band
                ),
            }));
        },
    };

    useActiveGamesStore.getState().updateGame(bandProps.gameId, (game) => ({ ...game, bands: [...game.bands, band] }));
};

const updateBandStatus = (guessId: string, status: BandStatus, gameId: string) => {
    const game = useActiveGamesStore.getState().games.find((game) => game.id === gameId);

    if (!game) return console.error("Game not found - please check the game ID");
    const band = game.bands.find((band) => band.guessId === guessId);

    if (!band) return console.error("Band not found - please check the guess ID");
    band.setStatus(status);
}

const setCurrentBandName = (guessId: string) => {
    const currentBandName = useGameStore.getState().bands.find(
        (band) => band.guessId === guessId
    )?.name;
    setGameState({ currentBandName });
};

export { addNewBandToGameStore, updateBandStatus, setCurrentBandName };