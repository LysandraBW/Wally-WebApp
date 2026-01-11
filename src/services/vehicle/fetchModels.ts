"use server";

export const fetchModels = async (year: string, make: string) => {
    if (!year || !make)
        return [];

    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make.replaceAll(' ', '%20')}/modelyear/${year}?format=json`;
    const fetchedModels: Array<{Model_Name: string}> = (await (await fetch(url)).json()).Results;
    let models: Array<[string, string]> = fetchedModels.map(m => [m.Model_Name, m.Model_Name]);

    const duplicates: {[k: string]: number} = {};
    models = models.filter(model => {
        if (duplicates[model[0]])
            return false;
        duplicates[model[0]] = 1;
        return true;
    });

    models.sort((a, b) => a[1].localeCompare(b[1]));
    return models;
}