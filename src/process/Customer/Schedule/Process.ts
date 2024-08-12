import { DataKeys, DataType, InitialData } from "@/submission/Customer/Schedule/Data";
import { useEffect, useState } from "react";
import { LoadedType, InitialLoaded } from "./Loaded";
import { InitialState, StateType } from "./State";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { inValues, validEmail, validName, validPhone, validVIN } from "@/validation/Validation";
import { flattenValues } from "@/lib/Service/Value";
import { LoadModels, LoadVehicle } from "@/lib/Vehicle/Decoder";
import submitForm from "@/submission/Customer/Schedule/Submit";

export default function useSchedule() {
    const [data, setData] = useState<DataType>();
    const [state, setState] = useState<StateType>();
    const [loaded, setLoaded] = useState<LoadedType>();
    
    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setLoaded(await InitialLoaded());
        setData(await InitialData());
        setState(await InitialState());
    }

    const inspectData = async <T,>(key: DataKeys, value: T, callback: (value: T) => Promise<MessageType>): Promise<boolean> => {
        const [state, message] = await callback(value);
        setState(_state => Object.assign({}, _state, {[`${key}`]: {state, message}}));
        return state;
    }

    const updateData = async (key: DataKeys, value: any) => {
        setData(data => Object.assign({}, data, {[`${key}`]: value}));
        switch (key) {
            case 'FName':
            case 'LName':
                inspectData(key, value, validName);
                break;
            case 'Email':
                inspectData(key, value, validEmail);
                break;
            case 'Phone':
                inspectData(key, value, validPhone);
                break;
            case 'VIN':
                await updateVehicle(value);
                inspectData(key, value, validVIN);
                break;
            case 'Make':
                if (!loaded || !data)
                    return;
                await updateVehicleModels(data.ModelYear[0], value[0]);
                inspectData(key, value, await inValues(loaded.Makes));
                break;
            case 'Model':
                if (!loaded)
                    return;
                inspectData(key, value, await inValues(loaded.Models));
                break;
            case 'ModelYear':
                if (!loaded || !data)
                    return;
                await updateVehicleModels(value[0], data.Make[0]);
                inspectData(key, value, await inValues(loaded.ModelYears));
                break;
            case 'Services':
                if (!loaded)
                    return
                inspectData(key, value, await inValues(flattenValues(loaded.Services)));
                break;
        }
    }

    const updateVehicle = async (VIN: string) => {
        if (!loaded || !VIN)
            return;

        const vehicle = await LoadVehicle(VIN, loaded.Makes);
        if (!vehicle.decoded)
            return;

        setData(data => Object.assign({}, data, vehicle));
        setLoaded(loaded => Object.assign({}, loaded, vehicle.models));
    }

    const updateVehicleModels = async (modelYear: number, make: string) => {
        const vehicleModels = await LoadModels(modelYear, make);
        setLoaded(loaded => Object.assign({}, loaded, {Models: []}));
        setLoaded(loaded => Object.assign({}, loaded, vehicleModels));
    }

    const inspectContactData = async () => {
        if (!data)
            return false;
        const vFName = await inspectData('FName', data.FName, validName);
        const vLName = await inspectData('LName', data.LName, validName);
        const vEmail = await inspectData('Email', data.Email, validEmail);
        const vPhone = await inspectData('Phone', data.Phone, validPhone);
        return vFName && vLName && vEmail && vPhone;
    }

    const inspectVehicleData = async () => {
        if (!loaded || !data)
            return false;
        const vMake = await inspectData('Make', data.Make, await inValues(loaded.Makes));
        const vModel = await inspectData('Model', data.Model, await inValues(loaded.Models));
        const vModelYear = await inspectData('ModelYear', data.ModelYear, await inValues(loaded.ModelYears));
        return vMake && vModel && vModelYear;
    }

    const inspectServiceData = async () => {
        if (!loaded || !data)
            return false;
        const vServices = await inspectData('Services', data.Services, await inValues(flattenValues(loaded.Services)));
        return vServices;
    }

    const inspectAllData = async () => {
        const vContact = await inspectContactData();
        const vVehicle = await inspectVehicleData();
        const vService = await inspectServiceData();
        return vContact && vVehicle && vService;
    }

    const submitData = async (): Promise<string> => {
        if (!data)
            return '';

        const aptID = await submitForm(data);
        if (!aptID)
            return '';

        await load();
        return aptID;
    }

    return {
        data,
        state,
        loaded,
        updateData,
        inspectContactData,
        inspectVehicleData,
        inspectServiceData,
        inspectAllData,
        submitData
    }
}