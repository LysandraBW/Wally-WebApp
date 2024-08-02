export interface LoadedValuesStructure {
    makes:      Array<[string, string]>;
    models:     Array<[string, string]>;
    modelYears: Array<[number, string]>;
    services:   {[k: string]: Array<[number, string]>}
}

export const LoadedValues: LoadedValuesStructure = {
    makes:      [],
    models:     [],
    modelYears: [],
    services:   {}
}