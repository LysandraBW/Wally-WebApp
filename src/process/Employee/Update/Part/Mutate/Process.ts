import { CreatePartProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Part/CreatePart";
import { UpdatePartProps } from "@/views/Employee/Dashboard/Update/Form/ServiceForm/Part/UpdatePart";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { DataKeys, UpdatePart } from "@/submission/Employee/Update/Part/Form";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { hasLength, validNumber } from "@/validation/Validation";

export type MutateType = 'Update' | 'Create';

export interface UpdatePartFormProps extends UpdatePartProps {
    mutateType: 'Update';
    initialValues: UpdatePart;
}

export interface CreatePartFormProps extends CreatePartProps {
    mutateType: 'Create';
    initialValues: UpdatePart;
}

export type MutatePartFormProps = UpdatePartFormProps | CreatePartFormProps;

export default function useMutatePart(props: MutatePartFormProps) {
    const initialValues = {...props.initialValues};
    const [edit, setEdit] = useState<boolean>();
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<UpdatePart>();

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
            case 'PartNumber':
                inspectData(key, value, hasLength);
                break;
            case 'PartName':
                inspectData(key, value, hasLength);
                break;
            case 'UnitCost':
                inspectData(key, value, validNumber);
                break;
            case 'Quantity':
                inspectData(key, value, validNumber);
                break;
        }
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;

        const v1 = await inspectData('PartNumber', values.PartNumber, hasLength);
        const v2 = await inspectData('PartName', values.PartName, hasLength);
        const v3 = await inspectData('Quantity', values.Quantity, validNumber);
        const v4 = await inspectData('UnitCost', values.UnitCost, validNumber);

        return v1 && v2 && v3 && v4;
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