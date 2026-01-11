import { z } from "zod";
import { States } from "./Input";

export default function processTestResults(issues: z.ZodIssue[], breakEarly: boolean = false): States {
    const states: States = {};
    const seen = new Set();
    for (const issue of issues) {
        const name = issue.path[0];

        if (typeof name !== "string" )
            continue;
        
        if (breakEarly && seen.has(name))
            break;

        if (!seen.has(name)) {
            states[name] = [false, ""];
            seen.add(name);
        }
        
        states[name][1] += issue.message + " ";
    }
    return states;
}