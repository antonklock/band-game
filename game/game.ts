import { FnContext, Game } from 'boardgame.io';
import { gameStateSchema, GameTurnContext, MoveContext, moveContextSchema, turnContextSchema } from '../zod/schemas';
import { INVALID_MOVE } from 'boardgame.io/core';
import validateMove from '../boardgameio/moveValidators';
import { z } from 'zod';

type GameState = z.infer<typeof gameStateSchema>;

export const BandGame: Game<GameState> = {
    setup: () => ({
        messages: [],
        usedBands: [],
        scores: {},
    }),

    turn: {
        minMoves: 1,
        maxMoves: 1,
        order: {
            first: () => {
                console.log("Setting first player");
                return 0;
            },
            next: (context: FnContext<GameState>) => {
                console.log("Turn context:", context);

                const currentPlayer = parseInt(context.ctx.currentPlayer as string);
                const nextPlayer = (currentPlayer + 1) % 2;

                console.log("Switching from player", currentPlayer, "to player", nextPlayer);
                return nextPlayer;
            }
        },
        onEnd: (context: FnContext<GameState>) => {
            console.log("Turn ended for player", context.ctx.currentPlayer);
        },
        onBegin: (context: FnContext<GameState>) => {
            console.log("Turn began for player", context.ctx.currentPlayer);
        },
    },

    moves: {
        playBand: (context, bandName: string) => {
            try {
                const { G, ctx } = moveContextSchema.parse(context);
                console.log("Current player:", ctx.currentPlayer);
                const lastBand = G.messages[G.messages.length - 1]?.bandName || null;

                const validation = validateMove(bandName, lastBand, G.usedBands);
                if (!validation.valid) {
                    return INVALID_MOVE;
                }

                console.log("Validation passed");

                const newState = {
                    ...G,
                    messages: [...G.messages, {
                        bandName,
                        playerId: ctx.currentPlayer,
                        timestamp: Date.now()
                    }],
                    usedBands: [...G.usedBands, bandName.toLowerCase()],
                    scores: {
                        ...G.scores,
                        [ctx.currentPlayer]: (G.scores[ctx.currentPlayer] || 0) + 1
                    }
                };

                try {
                    context.events?.endTurn();
                    return gameStateSchema.parse(newState);
                } catch (error) {
                    return INVALID_MOVE;
                }
            } catch (error) {
                console.error('Move context validation failed:', error);
                return INVALID_MOVE;
            }
        }
    },
};