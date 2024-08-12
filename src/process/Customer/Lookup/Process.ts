import { DataKeys, DataType, InitialData } from "@/submission/Customer/Lookup/Data";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { hasLength, validEmail } from "@/validation/Validation";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { submitForm } from "@/submission/Customer/Lookup/Submit";
import { AppointmentType } from "./Type";

export default function useLookup() {
    const [data, setData] = useState<DataType>();
    const [state, setState] = useState<StateType>();
    const [appointment, setAppointment] = useState<AppointmentType>(null);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setData(await InitialData());
        setState(await InitialState());
    }

    const inspectData = async <T,>(key: DataKeys, value: T, callback: (value: T) => Promise<MessageType>): Promise<boolean> => {
        const [state, message] = await callback(value);
        setState(_state => Object.assign({}, _state, {[`${key}`]: {state, message}}));
        return state;
    }
    
    const inspectAllData = async () => {
        if (!data)
            return false;
        const vAppointmentID = await inspectData('AppointmentID', data.AppointmentID, hasLength);
        const vEmail = await inspectData('Email', data.Email, validEmail);
        return vAppointmentID && vEmail;
    }

    const updateData = async (key: DataKeys, value: any) => {
        setData(data => Object.assign({}, data, {[`${key}`]: value}));   
        switch (key) {
            case 'AppointmentID':
                inspectData('AppointmentID', value, hasLength);
                break;
            case 'Email':
                inspectData('Email', value, validEmail);
                break;
        }
    }

    const resetData = async () => {
        load();
        setAppointment(null);
    }

    const submitData = async (): Promise<AppointmentType> => {
        if (!data)
            return null;
        setAppointment(await submitForm(data));
    }

    return {
        data,
        state,
        appointment,
        resetData,
        updateData,
        submitData,
        inspectAllData
    }
}