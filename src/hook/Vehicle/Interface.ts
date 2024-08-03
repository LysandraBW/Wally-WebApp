interface LoadedValuesStructure {
    makes: Array<[string, string]>;
    models: Array<[string, string]>;
    modelYears: Array<[number, string]>;
}
export const LoadedValues: LoadedValuesStructure = {
    makes: [],
    models: [],
    modelYears: [],
};
interface VehicleStructure {
    make: string;
    model: string;
    modelYear: number;
    vin: string;
    mileage: number;
    licensePlate: string;
}
export const Vehicle: VehicleStructure = {
    make: '',
    model: '',
    modelYear: -1,
    vin: '',
    mileage: -1,
    licensePlate: ''
};