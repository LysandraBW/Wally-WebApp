import { InspectionMessageOutput } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import * as Inspector from "@/lib/Inspector/Inspector/Inspect/Inspectors";

export const validValue = async <T> (
    value: Array<T>, 
    values: Array<T>
): Promise<InspectionMessageOutput> => {
    return await Inspector.inValues({
        values: values
    }).inspect(value);
}

export const validVIN = async (
    vin: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isVIN({
        optional: true
    }).inspect(vin);
}

export const validServices = async (
    services: Array<number>,
    allServices: Array<number>
): Promise<InspectionMessageOutput> => {
    return await Inspector.inValues({
        values: allServices
    }).inspect(services);
}

export const validName = async (
    name: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isName().inspect(name);
}

export const validEmail = async (
    email: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isEmailAddress().inspect(email);
}

export const validPhone = async (
    phone: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isPhoneNumber().inspect(phone);
}

export const validUniqueIdentifier = async (
    uniqueIdentifier: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isUniqueIdentifier().inspect(uniqueIdentifier);
}

export const validDate = async (
    datetime: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isDateTime({
        optional: true
    }).inspect(datetime);
}

export const validNumber = async (
    number: string | number
): Promise<InspectionMessageOutput> => {
    return await Inspector.isNumber().inspect(number);
}

export const validLicensePlate = async (
    licensePlate: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.isLicensePlate().inspect(licensePlate);
}

export const hasLength = async (
    value: string
): Promise<InspectionMessageOutput> => {
    return await Inspector.hasValue().inspect(value);
}

export const validBit = async (
    value: number
): Promise<InspectionMessageOutput> => {
    return await Inspector.inValues({
        values: [0, 1]
    }).inspect(value);
}

export const inValues = async (
    values: Array<any>
) => {
    return async (v: any) => await Inspector.inValues({
        values: values
    }).inspect(v);
}

export const every = async (
    callback: (v: any) => Promise<boolean>
) => {
    return async (v: any) => await Inspector.every({
        callback: callback
    }).inspect(v);
}