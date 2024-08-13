import { DataKeys, UpdatePayment } from "@/submission/Employee/Update/Payment/Form";
import { CreatePaymentProps } from "@/views/Employee/Dashboard/Update/Form/PaymentForm/CreatePayment";
import { UpdatePaymentProps } from "@/views/Employee/Dashboard/Update/Form/PaymentForm/UpdatePayment";
import { useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { hasLength } from "@/validation/Validation";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";

export type MutateType = 'Update' | 'Create';

export interface UpdatePaymentFormProps extends UpdatePaymentProps {
    mutateType: 'Update';
    initialValues: UpdatePayment;
}

export interface CreatePaymentFormProps extends CreatePaymentProps {
    mutateType: 'Create';
    initialValues: UpdatePayment;
}

export type MutatePaymentFormProps = UpdatePaymentFormProps | CreatePaymentFormProps;

export default function useMutatePaymentForm(props: MutatePaymentFormProps) {
    const initialValues = {...props.initialValues};
    const [edit, setEdit] = useState<boolean>();
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<UpdatePayment>();

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
            case 'Name':
                inspectData(key, value, hasLength);
                break;
            case 'Type':
                inspectData(key, value, hasLength);
                break;
            case 'Payment':
                inspectData(key, value, hasLength);
                break;
            case 'CCN':
                inspectData(key, value, hasLength);
                break;
            case 'EXP':
                inspectData(key, value, hasLength);
                break;
        }
    }

    const resetData = async (key: DataKeys) => {
        if (!values || values[`${key}`])
            return;
        updateData(key, initialValues[`${key}`]);
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;

        const v1 = await inspectData('Name', values.Name, hasLength);
        const v2 = await inspectData('Type', values.Type, hasLength);
        const v3 = await inspectData('Payment', values.Payment, hasLength);
        const v4 = await inspectData('CCN', values.CCN, hasLength);
        const v5 = await inspectData('EXP', values.EXP, hasLength);

        return v1 && v2 && v3 && v4 && v5;
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