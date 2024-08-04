import { LoadModels, LoadVehicle } from "@/lib/Vehicle/Decoder";
import { validVIN } from "@/validation/Validation";
import { useState } from "react";
import { Vehicle, LoadedValues } from "./Interface";
import { toInteger } from "@/lib/Convert/Convert";

export default function useVehicle() {
    const [vehicle, setVehicle] = useState(Vehicle);
    const [loadedValues, setLoadedValues] = useState(LoadedValues);

    const loadModels = async (modelYear: string | number, make: string) => {
        const models = await LoadModels(toInteger(modelYear), make);
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
            modelYear: data.modelYear[0],
            models: data.models
        };
    }

    const setLoadedData = async (makes: Array<[string, string]>, modelYears: Array<[number, string]>, models: Array<[string, string]> = []) => {
        setLoadedValues((state) => ({
            ...state, 
            makes, 
            modelYears, 
            models
        }));
    }

    const setMake = async (make: string) => {
        await loadModels(vehicle.modelYear, make);
        setVehicle((state) => ({...state, model: '', make: make}));
    }

    const setModelYear = async (modelYear: number) => {
        await loadModels(modelYear, vehicle.make);
        setVehicle((state) => ({
            ...state,
            model: '',
            modelYear: modelYear
        }));
    }

    const setModel = async (model: string) => {
        setVehicle(state => ({
            ...state,
            model: model
        }));
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

    return {
        // For Immediate Access
        make: vehicle.make,
        model: vehicle.model,
        modelYear: vehicle.modelYear,
        vin: vehicle.vin,
        mileage: vehicle.mileage,
        licensePlate: vehicle.licensePlate,
        loadedMakes: loadedValues.makes,
        loadedModels: loadedValues.models,
        loadedModelYears: loadedValues.modelYears,
        // For Ease of Use
        form: {
            make: [vehicle.make],
            model: [vehicle.model],
            modelYear: [toInteger(vehicle.modelYear)],
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
        setLoadedData
    };
}