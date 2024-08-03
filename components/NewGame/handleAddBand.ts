import { addNewBandToGameStore } from "../../stores/gameStoreFunctions";
import { GuesserType } from "../../types";

export const handleAddNewBand = (
    bandName: string,
    player: GuesserType,
    guessId: string,
    gameId: string
) => {
    bandName = bandName.trim();

    if (player === "awayPlayer") {
        const newBandProps = {
            name: bandName,
            guesser: player,
            guessId,
            gameId,
        };
        addNewBandToGameStore(newBandProps, "valid");
    } else {
        const newBandProps = {
            name: bandName,
            guesser: player,
            guessId,
            gameId,
        };
        addNewBandToGameStore(newBandProps);
    }
};