import { Values } from "@/features/Form/DEF";
import { InputTest } from "@/features/Form/useForm/Input";
import { z } from "zod";

export const isVIN: InputTest = z.string().refine(v => {
    return !!v.match(/^[A-HJ-NPR-Z0-9]{17}$/)
}, {message: "Must enter a valid VIN."});

export const subsetOf = (values: Values, message: string = "Must select a value."): InputTest => {
    return z.array(z.string(), {"message": message}).refine(value => {
        // console.log("Running subsetOf")
        // console.log(values)
        // console.log(value)
        // console.log(message)
        return value.every(v => values.includes(v))
    }, {"message": message});
}

export const strictSubsetOf = (values: Values, message: string = "Must select a value."): InputTest => { 
    return z.array(z.string(), {"message": message}).refine(value => {
        // console.log("Running strictSubsetOf")
        // console.log(values)
        // console.log(value)
        // console.log(message)
        return value.length && value.every(v => values.includes(v))
    }, {"message": message});
};