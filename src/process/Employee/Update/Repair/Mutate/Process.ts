import { UpdatePart } from "@/submission/Employee/Update/Part/Form";
import { CreateRepairProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Repair/CreateRepair";
import { UpdateRepairProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Repair/UpdateRepair";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { DataKeys } from "@/submission/Employee/Update/Repair/Form";
import { hasLength } from "@/validation/Validation";
import { DB_Repair } from "@/database/Types";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";

export type MutateType = 'Update' | 'Create';

export interface UpdateRepairFormProps extends UpdateRepairProps {
    mutateType: 'Update';
    initialValues: DB_Repair;
}

export interface CreateRepairFormProps extends CreateRepairProps {
    mutateType: 'Create';
    initialValues: DB_Repair;
}

export type MutateRepairFormProps = UpdateRepairFormProps | CreateRepairFormProps;

export default function useMutateRepair(props: MutateRepairFormProps) {
    const initialValues = {...props.initialValues};
    const [edit, setEdit] = useState<boolean>();
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<DB_Repair>();

    useEffect(() => {
        const load = async () => {
            setEdit(props.mutateType === 'Create');
            setState(await InitialState());
            setValues({...initialValues});
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
            case 'Repair':
                inspectData(key, value, hasLength);
                break;
        }
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;
        return await inspectData('Repair', values.Repair, hasLength);
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