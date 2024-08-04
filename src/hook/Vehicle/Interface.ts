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
    modelYear: string | number;
    vin: string;
    mileage: string | number;
    licensePlate: string;
}
export const Vehicle: VehicleStructure = {
    make: '',
    model: '',
    modelYear: '',
    vin: '',
    mileage: '',
    licensePlate: ''
};