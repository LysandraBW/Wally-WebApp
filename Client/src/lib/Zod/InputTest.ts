import { Values } from "@/features/Form/DEF";
import { InputTest } from "@/features/Form/useForm/Input";
import { z } from "zod";

export const isVIN: InputTest = z.string().refine(v => {
    return !!v.match(/^[A-HJ-NPR-Z0-9]{17}$/)
}, {message: "Must enter a valid VIN."});

export const subsetOf = (values: Values): InputTest => {
    return z.array(z.string()).refine(value => {
        return value.every(v => values.includes(v))
    }, {message: "Must select a value."});
}

export const strictSubsetOf = (values: Values): InputTest => { 
    return z.array(z.string()).refine(value => {
        return value.length && value.every(v => values.includes(v))
    }, {message: "Must select a value."});
};