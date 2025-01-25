import { z } from "zod";

export interface Cost {
    Cost: string
}

export function makeCost(cost: string): Cost {
    return {
        Cost: cost
    }
}

export const costTest = z.object({
    Cost: z.string()
});

export interface CostUpdates {
    Cost: string | null;
}