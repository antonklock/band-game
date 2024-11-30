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
    usedBands: z.set(z.string()),
    scores: z.record(z.string(), z.number()),
});

export { moveSchema, gameStateSchema };