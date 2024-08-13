import { DB_Diagnosis } from "@/database/Types";
import { CreateDiagnosisProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Diagnosis/CreateDiagnosis";
import { UpdateDiagnosisProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Diagnosis/UpdateDiagnosis";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { DataKeys } from "@/submission/Employee/Update/Diagnosis/Form";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { hasLength } from "@/validation/Validation";

export type MutateType = 'Update' | 'Create';

export interface UpdateDiagnosisFormProps extends UpdateDiagnosisProps {
    mutateType: 'Update';
    initialValues: DB_Diagnosis;
}

export interface CreateDiagnosisFormProps extends CreateDiagnosisProps {
    mutateType: 'Create';
    initialValues: DB_Diagnosis;
}

export type MutateDiagnosisProps = UpdateDiagnosisFormProps | CreateDiagnosisFormProps;

export default function useMutateDiagnosis(props: MutateDiagnosisProps) {
    const initialValues = {...props.initialValues};

    const [edit, setEdit] = useState<boolean>();
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<DB_Diagnosis>();

    useEffect(() => {
        const load = async () => {
            setEdit(props.mutateType === 'Create');
            setState(await InitialState());
            setValues({...props.initialValues});
        }
        load();
    }, []);

    const inspectData = async <T,>(key: DataKeys, value: T, callback: (value: T) => Promise<MessageType>): Promise<boolean> => {
        const [state, message] = await callback(value);
        setState(_state => Object.assign({}, _state, {[`${key}`]: {state, message}}));
        return state;
    }

    const updateData = async (key: DataKeys, value: any) => {
        setValues(data => Object.assign({}, data, {[`${key}`]: value}));
        switch (key) {
            case 'Code':
                inspectData(key, value, hasLength);
                break;
            case 'Message':
                inspectData(key, value, hasLength);
                break;
        }
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;

        const v1 = await inspectData('Code', values.Code, hasLength);
        const v2 = await inspectData('Message', values.Message, hasLength);

        return v1 && v2;
    }

    const resetData = async (key: DataKeys) => {
        if (!values || values[`${key}`])
            return;
        updateData(key, initialValues[`${key}`]);
    }

    const finalizeUpdate = async () => {
        setEdit(false);
        if (!values || !(await inspectAll()) || props.mutateType !== 'Update')
            return;
        props.onUpdate(values);
    }

    const finalizeCreate = async () => {
        if (!(await inspectAll()) || props.mutateType !== 'Create')
            return;
        props.onChange(values);
        setValues(initialValues);
    }

    return {
        edit,
        state,
        values,
        updateData,
        resetData,
        setEdit,
        finalizeUpdate,
        finalizeCreate
    }
}