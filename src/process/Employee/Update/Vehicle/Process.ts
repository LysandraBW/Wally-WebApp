import { DB_Appointment } from "@/database/Types";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { InitialLoaded, LoadedType } from "./Loaded";
import { DataKeys, InitialVehicleForm, VehicleFormStructure } from "@/submission/Employee/Update/Vehicle/Form";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { inValues, validLicensePlate, validMileage, validNumber, validVIN } from "@/validation/Validation";
import { getValues } from "@/lib/Vehicle/Value";
import { submitVehicleForm } from "@/submission/Employee/Update/Vehicle/Submit";

export default function useVehicleForm(appointment: DB_Appointment) {
    const [state, setState] = useState<StateType>();
    const [loaded, setLoaded] = useState<LoadedType>();
    const [updated, setUpdated] = useState<VehicleFormStructure>();
    const [reference, setReference] = useState<VehicleFormStructure>();

    useEffect(() => {
        const load = async () => {
            setState(await InitialState());
            setLoaded(await InitialLoaded());
            
            const vehicleForm = await InitialVehicleForm(appointment);
            setUpdated(vehicleForm);
            setReference(vehicleForm);
        }
        load();
    }, [appointment]);

    const inspectData = async <T,>(key: DataKeys, value: T, callback: (value: T) => Promise<MessageType>): Promise<boolean> => {
        const [state, message] = await callback(value);
        setState(_state => Object.assign({}, _state, {[`${key}`]: {state, message}}));
        return state;
    }

    const updateData = async (key: DataKeys, value: any) => {
        setUpdated(data => Object.assign({}, data, {[`${key}`]: value}));
        switch (key) {
            case 'VIN':
                inspectData(key, value, validVIN);
                break;
            case 'Make':
                if (!loaded)
                    return;
                inspectData(key, value, await inValues(getValues(loaded.Makes)));
                break;
            case 'Model':
                if (!loaded)
                    return;
                inspectData(key, value, await inValues(getValues(loaded.Models)));
                break;
            case 'ModelYear':
                if (!loaded)
                    return;
                inspectData(key, value, await inValues(getValues(loaded.ModelYears)));
                break;
            case 'Mileage':
                inspectData(key, value, validNumber);
                break;
            case 'LicensePlate':
                inspectData(key, value, validLicensePlate);
                break;
        }
    }

    const submitData = async (): Promise<boolean> => {
        if (!reference || !updated || !loaded)
            return false;

        const v1 = inspectData('VIN', updated.VIN, validVIN);
        const v2 = inspectData('Make', updated.Make, await inValues(getValues(loaded.Makes)));
        const v3 = inspectData('Model', updated.Model, await inValues(getValues(loaded.Models)));
        const v4 = inspectData('ModelYear', updated.ModelYear, await inValues(getValues(loaded.ModelYears)));
        const v5 = inspectData('Mileage', updated.Mileage, validMileage);
        const v6 = inspectData('LicensePlate', updated.LicensePlate, validLicensePlate);

        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6)
            return false;
        return await submitVehicleForm(reference, updated);
    }

    const resetData = async (): Promise<void> => {
        if (!reference)
            return;
        setUpdated(reference);
    }

    return {
        state,
        updated,
        loaded,
        updateData,
        submitData,
        resetData
    }
}