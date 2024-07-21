import { addNewBandToGameStore } from "../../stores/gameStoreFunctions";

export const handleAddNewBand = (
    bandName: string,
    player: "player" | "opponent",
    guessId: string
) => {
    bandName = bandName.trim();

    if (player === "opponent") {
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