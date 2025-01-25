import { z } from "zod";
import { Input, InputTest } from "./Input";

export type FormData = {[name: string]: Input};
export type FormTest = z.ZodObject<{[name: string]: InputTest}, "strip", z.ZodTypeAny, {}, {}>;
export type Form = {data: FormData; test: FormTest};