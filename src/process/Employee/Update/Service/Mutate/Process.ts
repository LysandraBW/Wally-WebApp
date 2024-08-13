import { DB_AppointmentService } from "@/database/Types";
import { UpdateServiceProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Service/UpdateService";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { DataKeys } from "@/submission/Employee/Update/Service/Form";
import { hasLength } from "@/validation/Validation";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { CreateServiceProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Service/CreateService";

export type MutateType = 'Update' | 'Create';

export interface UpdateServiceFormProps extends UpdateServiceProps {
    mutateType: 'Update';
    initialValues: DB_AppointmentService;
}

export interface CreateServiceFormProps extends CreateServiceProps {
    mutateType: 'Create';
    initialValues: DB_AppointmentService;
}

export type MutateServiceFormProps = UpdateServiceFormProps | CreateServiceFormProps;

export default function useMutateServiceForm(props: MutateServiceFormProps) {
    const initialValues = {...props.initialValues};

    const [edit, setEdit] = useState<boolean>();
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<DB_AppointmentService>();

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
            case 'Class':
                inspectData(key, value, hasLength);
                break;
            case 'Division':
                inspectData(key, value, hasLength);
                break;
            case 'Service':
                inspectData(key, value, hasLength);
                break;
        }
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;

        const v1 = await inspectData('Class', values.Class, hasLength);
        const v2 = await inspectData('Service', values.Service, hasLength);
        const v3 = await inspectData('Division', values.Division, hasLength);

        return v1 && v2 && v3;
    }

    const resetData = async (key: DataKeys) => {
        if (!values || values[`${key}`])
            return;
        updateData(key, initialValues[`${key}`]);
    }

    const submitUpdatedData = async () => {
        setEdit(false);
        if (!values || !(await inspectAll()) || props.mutateType !== 'Update')
            return;
        props.onUpdate(values);
    }

    const submitNewData = async () => {
        if (!(await inspectAll()) || props.mutateType !== 'Create')
            return;
        props.onChange('Services', values);
        setValues(props.initialValues);
    }

    return {
        edit,
        state,
        values,
        updateData,
        resetData,
        setEdit,
        submitUpdatedData,
        submitNewData
    }
}