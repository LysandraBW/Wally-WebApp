import { z } from "zod";
import { Input, InputTest } from "./Input";

export type FormData = {[name: string]: Input};
export type FormTest = z.ZodObject;
export type Form = {data: FormData; test: FormTest};