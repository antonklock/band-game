import { moveSchema } from "../zod/schemas";
import { z } from "zod";

const validateMove = (bandName: string, lastBand: string | null, usedBands: string[]) => {
    try {
        // Step 1: Validate data structure
        moveSchema.shape.bandName.parse(bandName);

        const normalizedBand = bandName.toLowerCase();

        // Step 2: Check if band was already used
        if (usedBands.includes(normalizedBand)) {
            return {
                valid: false,
                error: 'This band has already been used'
            };
        }

        if (!lastBand) {
            // Skip first letter validation if this is the first move
            console.log('First move, skipping letter validation');
            return { valid: true };
        }

        const lastLetter = lastBand[lastBand.length - 1].toLowerCase();
        const firstLetter = normalizedBand[0].toLowerCase();

        if (lastLetter !== firstLetter) {
            return {
                valid: false,
                error: `Band must start with '${lastLetter}'`
            };
        }

        return { valid: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                valid: false,
                error: error.errors[0].message
            };
        }
        throw error;
    }
};

export default validateMove;