import { z } from "zod";

export type InputData = any;
export type InputTest = z.ZodType;
export type InputState = [boolean|null, string];
export type Input = {data: InputData; state: InputState};
export type Data = {[name: string]: InputData};
export type States = {[name: string]: InputState};