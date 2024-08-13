import { DB_Appointment } from "@/database/Types";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import loadStatuses, { Statuses } from "@/lib/Status/Load";
import { DataKeys, GeneralFormStructure, InitialGeneralForm } from "@/submission/Employee/Update/General/Form";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { inValues, validDate, validEmail, validName, validPhone } from "@/validation/Validation";
import { submitGeneralForm } from "@/submission/Employee/Update/General/Submit";

export default function useGeneralForm(appointment: DB_Appointment) {
    const [state, setState] = useState<StateType>();
    const [updated, setUpdated] = useState<GeneralFormStructure>();
    const [statuses, setStatuses] = useState<Statuses>();
    const [reference, setReference] = useState<GeneralFormStructure>();

    useEffect(() => {
        const load = async () => {
            const statuses = await loadStatuses();
            setStatuses(statuses);

            const initialState = await InitialState();
            setState(initialState);

            const generalForm = await InitialGeneralForm(appointment);
            setUpdated(generalForm);
            setReference(generalForm);
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
            case 'StartDate':
                inspectData(key, value, validDate);
                break;
            case 'EndDate':
                inspectData(key, value, validDate);
                break;
            case 'StatusID':
                if (!statuses)
                    return;
                inspectData(key, value, await inValues(statuses.map(([m]) => m)));
        }
    }

    const submitData = async (): Promise<boolean> => {
        if (!reference || !updated || !statuses)
            return false;

        const v1 = inspectData('FName', updated.FName, validName);
        const v2 = inspectData('LName', updated.LName, validName);
        const v3 = inspectData('Email', updated.Email, validEmail);
        const v4 = inspectData('Phone', updated.Phone, validPhone);
        const v5 = inspectData('StatusID', updated.StatusID, await inValues(statuses.map(([m]) => m)));
        const v6 = inspectData('EndDate', updated.EndDate, validDate);
        const v7 = inspectData('StartDate', updated.StartDate, validDate);

        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7)
            return false;
        return await submitGeneralForm(reference, updated);
    }

    const resetData = async (): Promise<void> => {
        if (!reference)
            return;
        setUpdated(reference);
    }

    return {
        state,
        updated,
        statuses,
        updateData,
        submitData,
        resetData
    }
}