import { FnContext } from "boardgame.io";
import { z } from "zod";

const moveSchema = z.object({
    bandName: z.string()
        .min(1, "Band name cannot be empty")
        .max(100, "Band name too long"),
    timestamp: z.number(),
    playerId: z.string(),
});

const gameStateSchema = z.object({
    messages: z.array(moveSchema),
    usedBands: z.array(z.string()),
    scores: z.record(z.string(), z.number()),
});

const turnContextSchema = z.object({
    playOrderPos: z.number().min(0).max(1),
    numPlayers: z.number().max(2, "There must be 2 players").min(2, "There must be 2 players"),
    playOrder: z.array(z.number()).length(2, "Must have exactly 2 players"),
    currentPlayer: z.string().regex(/^[0-1]$/, "Player must be '0' or '1'")
});

export const moveContextSchema = z.object({
    G: gameStateSchema,
    ctx: z.object({
        currentPlayer: z.string(),
        phase: z.string().nullable(),
        turn: z.number(),
        numPlayers: z.number(),
        playOrder: z.array(z.string()),
        playOrderPos: z.number(),
    }),
    events: z.object({
        endTurn: z.function().args().returns(z.void()),
        endPhase: z.function().args().returns(z.void()),
        endGame: z.function().args().returns(z.void()),
    }).optional()
});

export { moveSchema, gameStateSchema, turnContextSchema };
export type GameTurnContext = FnContext & z.infer<typeof turnContextSchema>;
export type MoveContext = z.infer<typeof moveContextSchema>;