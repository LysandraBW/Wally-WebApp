import { inValues, isDateTime, isEmailAddress, isLicensePlate, isName, isNumber, isPhoneNumber, isUniqueIdentifier, isVIN } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

export const validMake = async (
    make: Array<string>, 
    makes: Array<string>
): Promise<[boolean, string?]> => {
    return await inValues({
        values: makes.map(m => m[0])
    }).inspect(make);
}

export const validModel = async (
    model: Array<string>, 
    models: Array<string>
): Promise<[boolean, string?]> => {
    return await inValues({
        values: models.map(m => m[0])
    }).inspect(model);
}

export const validModelYear = async (
    modelYear: Array<number>, 
    modelYears: Array<number>
): Promise<[boolean, string?]> => {
    return await inValues({
        values: modelYears
    }).inspect(modelYear);
}

export const validVIN = async (
    vin: string
): Promise<[boolean, string?]> => {
    return await isVIN({
        optional: true
    }).inspect(vin);
}

export const validServices = async (
    services: Array<number>,
    allServices: Array<number>
): Promise<[boolean, string?]> => {
    return await inValues({
        values: Object.values(allServices)
    }).inspect(services);
}

export const validName = async (
    name: string
): Promise<[boolean, string?]> => {
    return await isName().inspect(name);
}

export const validEmail = async (
    email: string
): Promise<[boolean, string?]> => {
    return await isEmailAddress().inspect(email);
}

export const validPhone = async (
    phone: string
): Promise<[boolean, string?]> => {
    return await isPhoneNumber().inspect(phone);
}

export const validUniqueIdentifier = async (
    uniqueIdentifier: string
): Promise<[boolean, string?]> => {
    return await isUniqueIdentifier().inspect(uniqueIdentifier);
}

export const validDate = async (
    datetime: string
): Promise<[boolean, string?]> => {
    return await isDateTime({
        optional: true
    }).inspect(datetime);
}

export const validNumber = async (
    number: string | number
): Promise<[boolean, string?]> => {
    return await isNumber().inspect(number);
}

export const validLicensePlate = async (
    licensePlate: string
): Promise<[boolean, string?]> => {
    return await isLicensePlate().inspect(licensePlate);
}