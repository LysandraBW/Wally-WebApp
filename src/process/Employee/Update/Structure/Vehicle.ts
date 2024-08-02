export interface LoadedValues {
    makes:      Array<[string, string]>;
    models:     Array<[string, string]>;
    modelYears: Array<[number, string]>;
}

export const Values: LoadedValues = {
    makes:      [],
    models:     [],
    modelYears: []
};
