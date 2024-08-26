import { addNewBandToGameStore } from "../../stores/gameStoreFunctions";
import { GuesserType } from "../../types";

export const handleAddNewBand = (
    bandName: string,
    player: GuesserType,
    guessId: string
) => {

    console.log("bandName: ", bandName);
    bandName = bandName.trim();

    if (player === "awayPlayer") {
        const newBandProps = {
            name: bandName,
            guesser: player,
            guessId,
        };
        addNewBandToGameStore(newBandProps, "valid");
    } else {
        const newBandProps = {
            name: bandName,
            guesser: player,
            guessId,
        };
        addNewBandToGameStore(newBandProps);
    }
};