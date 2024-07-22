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