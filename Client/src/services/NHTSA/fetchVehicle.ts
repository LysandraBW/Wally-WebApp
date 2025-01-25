import { fetchModels } from "./fetchModels";

interface DecodedVIN {
    decoded: boolean;
    make: [string],
    model: [string],
    models: Array<[string, string]>
    modelYear: [string]
}

export const fetchVehicle = async (vin: string, makes: Array<[string, string]>): Promise<DecodedVIN> => {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    const vehicle = (await (await fetch(url)).json()).Results[0];

    const make = makes.find(m => m[0].toUpperCase() === vehicle.Make.toUpperCase());
    const model = vehicle.Model;
    const modelYear = vehicle.ModelYear;

    if (!make || !model || !modelYear)
        return {decoded: false, make: [""], model: [""], models: [], modelYear: [""]};

    const models = await fetchModels(modelYear, make[0]);

    return {
        decoded: true, 
        make: [make[0]], 
        model: [model],
        models: models,
        modelYear: [modelYear]
    }
}