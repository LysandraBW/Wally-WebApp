import { LoadModels, LoadVehicle } from "@/lib/Vehicle/Decoder";
import { validVIN } from "@/validation/Validation";
import { useState } from "react";

interface LoadedValuesStructure {
    makes:      Array<[string, string]>;
    models:     Array<[string, string]>;
    modelYears: Array<[number, string]>;
}

const LoadedValues: LoadedValuesStructure = {
    makes:      [],
    models:     [],
    modelYears: [],
}

interface VehicleStructure {
    make: string;
    model: string;
    modelYear: number;
    vin: string;
}

const Vehicle: VehicleStructure = {
    make: '',
    model: '',
    modelYear: -1,
    vin: ''
}

export default function useVehicle() {
    const [vehicle, setVehicle] = useState(Vehicle);
    const [loadedValues, setLoadedValues] = useState(LoadedValues);

    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setLoadedValues({...loadedValues, models});
    }

    const loadVehicle = async (vin: string) => {
        if (!vin)
            return;

        const data = await LoadVehicle(vin, loadedValues.makes);
        if (!data.decoded)        
            return;

        setLoadedValues({...loadedValues, models: data.models});
        return {
            make: data.make[0],
            model: data.model[0],
            modelYear: data.modelYear[0]
        };
    }

    const setLoadedVals = async (makes: Array<[string, string]>, modelYears: Array<[number, string]>) => {
        setLoadedValues((state) => ({...state, makes}));
        setLoadedValues((state) => ({...state, modelYears}));
    }

    const setMake = async (make: string) => {
        await loadModels(vehicle.modelYear, make);
        setVehicle({
            ...vehicle,
            model: '',
            make: make
        });
    }

    const setModelYear = async (modelYear: number) => {
        await loadModels(modelYear, vehicle.make);
        setVehicle({
            ...vehicle,
            model: '',
            modelYear: modelYear
        });
    }

    const setVIN = async (vin: string) => {
        const valid = (await validVIN(vin))[0];
        setVehicle((state) => ({...state, vin: vin}));

        if (!valid)
            return;
        
        const vehicleData = await loadVehicle(vin);
        if (!vehicleData)
            return;

        setVehicle((state) => ({
            ...state,
            ...vehicleData,
            vin: vin
        }));
    }

    const setModel = async (model: string) => {
        console.log('setModel Called', model)
        setVehicle(state => ({
            ...state,
            model: model
        }));
    }

    return {
        // For Immediate Access
        make: vehicle.make,
        model: vehicle.model,
        modelYear: vehicle.modelYear,
        vin: vehicle.vin,
        loadedMakes: loadedValues.makes,
        loadedModels: loadedValues.models,
        loadedModelYears: loadedValues.modelYears,
        // For Ease of Use
        form: {
            make: [vehicle.make],
            model: [vehicle.model],
            modelYear: [vehicle.modelYear],
            vin: vehicle.vin
        },
        loadedValues: {
            makes: loadedValues.makes,
            models: loadedValues.models,
            modelYears: loadedValues.modelYears
        },
        setMake,
        setModelYear,
        setModel,
        setVIN,
        setLoadedVals
    };
}