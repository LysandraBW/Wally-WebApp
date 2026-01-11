import { z } from "zod";
import { Values } from "@/features/Form/DEF";
import { InputTest } from "@/features/Form/useForm/Input";

export const subsetOf = (values: Values, message: string = "Must select a value."): InputTest => {
    return z.array(z.string(), { "message": message }).refine(value => {
        return value.every(v => values.includes(v));
    }, { "message": message });
};

export const strictSubsetOf = (values: Values, message: string = "Must select a value."): InputTest => {
    return z.array(z.string(), { "message": message }).refine(value => {
        return value.length && value.every(v => values.includes(v));
    }, { "message": message });
};