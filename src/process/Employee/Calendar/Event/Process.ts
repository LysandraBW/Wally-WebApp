import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import { DataKeys, UpdateEvent } from "@/submission/Employee/Calendar/Form";
import { CreateEventProps } from "@/views/Employee/Dashboard/Calendar/EventManager/CreateEvent";
import { UpdateEventProps } from "@/views/Employee/Dashboard/Calendar/EventManager/UpdateEvent";
import { useContext, useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { every, hasLength, validDate } from "@/validation/Validation";
import { Regexes } from "@/validation/Regexes";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";

export interface UpdateEventFormProps extends UpdateEventProps {
    mutateType: 'Update';
    initialValues: UpdateEvent;
}

export interface CreateEventFormProps extends CreateEventProps {
    mutateType: 'Create';
    initialValues: UpdateEvent;
}

export type MutateNoteFormProps = UpdateEventFormProps | CreateEventFormProps;

export default function useMutateEvent(props: MutateNoteFormProps) {
    const context = useContext(PageContext);
    const initialValues = {...props.initialValues};
    const [edit, setEdit] = useState(false);
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<UpdateEvent>();
    const [sharees, setSharees] = useState<Array<[string, string]>>([]);

    useEffect(() => {
        const load = async () => {
            if (props.mutateType === 'Create')
                setEdit(true);
            setState(await InitialState());
            setValues({...initialValues});    
        }
        load();
    }, []);

    useEffect(() => {
        const s1 = context.Employees.filter(e => (e.EmployeeID != context.Employee.EmployeeID));
        const s2 = s1.map(e => [e.EmployeeID, `${e.FName} ${e.LName}`])
        setSharees(s2 as Array<[string, string]>);
    }, [sharees]);

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
            case 'Summary':
                inspectData(key, value, hasLength);
                break;
            case 'Sharees':
                inspectData(key, value, await every(async v => !!v.match(Regexes.UniqueIdentifier)));
                break;
            case 'UpdatedDate':
                inspectData(key, value, validDate);
                break;
        }
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;

        const v1 = await inspectData('Name', values.Name, hasLength);
        const v2 = await inspectData('Summary', values.Summary, hasLength);
        const v3 = await inspectData('Sharees', values.Sharees, await every(async v => !!v.match(Regexes.UniqueIdentifier)));
        const v4 = await inspectData('UpdatedDate', values.UpdatedDate, validDate);

        return v1 && v2 && v3 && v4;
    }

    const resetData = async (key: DataKeys) => {
        if (!values || values[`${key}`])
            return;
        updateData(key, initialValues[`${key}`]);
    }

    const resetEvent = async () => {
        setValues(initialValues);
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
        context,
        sharees,
        setValues,
        updateData,
        resetData,
        resetEvent,
        setEdit,
        finalizeUpdate,
        finalizeCreate
    }
}