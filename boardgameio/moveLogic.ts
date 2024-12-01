import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/dist/types/src/core/constants";
import validateMove from "./moveValidators";
import { z } from "zod";
import { gameStateSchema } from "../zod/schemas";

type GameState = z.infer<typeof gameStateSchema>;

moves: {
    playBand: {
        move: (G: GameState, ctx: Ctx, bandName: string) => {
            const lastBand = G.messages[G.messages.length - 1]?.bandName || null;

            const validation = validateMove(bandName, lastBand, G.usedBands);
            if (!validation.valid) {
                return INVALID_MOVE;
            }

            const newState = {
                ...G,

                messages: [...G.messages, {
                    bandName,
                    playerId: ctx.currentPlayer,
                    timestamp: Date.now()
                }],

                usedBands: new Set([...G.usedBands, bandName.toLowerCase()]),

                scores: {
                    ...G.scores,
                    [ctx.currentPlayer]: (G.scores[ctx.currentPlayer] || 0) + 1
                }
            };

            try {
                return gameStateSchema.parse(newState);
            } catch (error) {
                return INVALID_MOVE;
            }
        }
    }
}