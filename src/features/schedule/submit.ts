export type DataKeys = 'FName' | 'LName' | 'Email' | 'Phone' | 'VIN' | 'Make' | 'Model' | 'ModelYear' | 'Services';
export type GenericDataType = {[k in DataKeys]: any};

export interface DataType extends GenericDataType {
    FName:      string;
    LName:      string;
    Email:      string;
    Phone:      string;
    VIN:        string;
    Make:       Array<string>;
    Model:      Array<string>;
    ModelYear:  Array<number>;
    Services:   Array<number>;
}

export const InitialData = async (): Promise<DataType> => {
    return {
        FName:      '',
        LName:      '',
        Email:      '',
        Phone:      '',
        VIN:        '',
        Make:       [],
        Model:      [],
        ModelYear:  [],
        Services:   []
    }
}

import { DataType } from "./Data";

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

export const processForm = (form: DataType): ProcessedFormStructure => {
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

"use server";
import { DataType } from "./Data";
import { processForm } from "./Process";
import { InsertAppointment, InsertDefinedService } from "@/db/export";

const submitForm = async (form: DataType): Promise<string> => {
    let processedForm = processForm(form);

    const AppointmentID = await InsertAppointment(processedForm.Scalar);
    if (!AppointmentID)
        return '';

    for (const ServiceID of processedForm.NonScalar.Services) {
        const serviceID = await InsertDefinedService({
            AppointmentID,
            ServiceID
        });

        if (!serviceID)
            return '';
    }
    
    return AppointmentID;
}

export default submitForm;