import { z } from "zod";
import { States } from "./Input";

export default function processTestResults(issues: z.ZodIssue[]): States {
    const states: States = {};
    const seen = new Set();
    for (const issue of issues) {
        const name = issue.path[0];
        if (!seen.has(name)) {
            states[name] = [false, ""];
            seen.add(name);
        }
        states[name][1] += issue.message + " ";
    }
    return states;
}