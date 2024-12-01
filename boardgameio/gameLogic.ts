import { Game } from "boardgame.io";
import { gameStateSchema } from "../zod/schemas";
import { z } from "zod";

type GameState = z.infer<typeof gameStateSchema>;

const BandNameGame: Game<GameState> = {
    setup: () => ({
        messages: [],
        usedBands: [],
        scores: {},
    }),

    turn: {
        minMoves: 1,
        maxMoves: 1,
    }
};

export default BandNameGame;