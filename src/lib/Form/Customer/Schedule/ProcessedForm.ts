import { FormStructure } from "./Form";

export interface ProcessedFormStructure {
    Scalar: {
        FName:          string;
        LName:          string;
        Email:          string;
        Phone:          string;
        VIN:            string;
        Make:           string;
        Model:          string;
        ModelYear:      number;
    };
    NonScalar: {
        Services:       Array<number>;
    }
}

export const processForm = (form: FormStructure): ProcessedFormStructure => {
    return {
        Scalar: {
            FName:      form.fName.trim(),
            LName:      form.lName.trim(),
            Email:      form.email.trim(),
            Phone:      form.phone.trim(),
            VIN:        form.vin.trim(),
            Make:       form.make[0],
            Model:      form.model[0],
            ModelYear:  form.modelYear[0],
        },
        NonScalar: {
            Services:   form.services
        }
    }
}