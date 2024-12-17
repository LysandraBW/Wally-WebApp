'use server';

export async function ModelYears(): Promise<Array<number>> {
    const MIN = 1980;
    const MAX = 2030;
    
    const years = [];
    for (let i = MAX; i >= MIN; i--)
        years.push(i);

    return years;
}

// Not Needed
export async function Makes(): Promise<Array<{Make_ID: number, Make_Name: string}>> {
    const URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json';
    return (await (await fetch(URL)).json()).Results;
}

export async function Models(year: number, make: string): Promise<Array<{
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}>> {
    const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make.replaceAll(' ', '%20')}/modelyear/${year}?format=json`;
    return (await (await fetch(URL)).json()).Results;
}

export async function DecodeVIN(vin: string): Promise<{
    Make: string;
    Model: string;
    ModelYear: number;
}> {
    const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    const {Make, Model, ModelYear} = (await (await fetch(URL)).json()).Results[0];
    return {Make, Model, ModelYear: parseInt(ModelYear)};
}

export async function LoadModels(modelYear: number, make: string): Promise<Array<[string, string]>> {
    if (!modelYear || !make)
        return [];

    const fetchedModels = (await Models(modelYear, make));
    let models: Array<[string, string]> = fetchedModels.map(m => [m.Model_Name, m.Model_Name]);

    // Removing Duplicates
    let duplicateModels: {[k: string]: number} = {};
    models = models.filter(model => {
        // Duplicate Found
        if (duplicateModels[model[0]])
            return false;
        duplicateModels[model[0]] = 1;
        return true;
    });

    // Sorting by Label
    models.sort((a, b) => a[1].localeCompare(b[1]));
    return models;
}

export async function LoadVehicle(vin: string, makes: Array<[string, string]>): Promise<{
    decoded: boolean;
    make: [string];
    model: [string];
    models: Array<[string, string]>;
    modelYear: [number]
}> {
    // Getting Make, Model, ModelYear
    const vehicle = await DecodeVIN(vin);

    const Make = makes.find(m => m[0].toUpperCase() === vehicle.Make.toUpperCase());
    const Model = vehicle.Model;
    const ModelYear = vehicle.ModelYear;

    if (!Make || !Model || !ModelYear)
        return {decoded: false, make: [''], model: [''], models: [], modelYear: [0]};

    // Load Models for Make and Model Year
    const Models = await LoadModels(ModelYear, Make[0]);
    
    return {
        decoded: true,
        make: [Make[0]], 
        model: [Model], 
        models: Models,
        modelYear: [ModelYear]
    }
}