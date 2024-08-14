import { DataKeys, UpdateNote } from "@/submission/Employee/Update/Note/Form";
import { CreateNoteProps } from "@/views/Employee/Dashboard/Update/Form/NoteForm/CreateNote";
import { UpdateNoteProps } from "@/views/Employee/Dashboard/Update/Form/NoteForm/UpdateNote";
import { useContext, useEffect, useState } from "react";
import { InitialState, StateType } from "./State";
import { every, hasLength, validBit } from "@/validation/Validation";
import { Regexes } from "@/validation/Regexes";
import { MessageType } from "@/lib/Inspector/Inspector/Inspect/Inspector";
import { PageContext } from "@/app/Employee/Dashboard/Update/page";

export interface UpdateNoteFormProps extends UpdateNoteProps {
    mutateType: 'Update';
    initialValues: UpdateNote;
}

export interface CreateNoteFormProps extends CreateNoteProps {
    mutateType: 'Create';
    initialValues: UpdateNote;
}

export type MutateNoteFormProps = UpdateNoteFormProps | CreateNoteFormProps;

export default function useMutateNote(props: MutateNoteFormProps) {
    const context = useContext(PageContext);
    const initialValues = {...props.initialValues};
    const [edit, setEdit] = useState(false);
    const [state, setState] = useState<StateType>();
    const [values, setValues] = useState<UpdateNote>();
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
        const s1 = context.Employees.filter(e => (e.EmployeeID != context.Employee.Employee.EmployeeID));
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
            case 'Head':
                inspectData(key, value, hasLength);
                break;
            case 'Body':
                inspectData(key, value, hasLength);
                break;
            case 'Sharees':
                inspectData(key, value, await every(async v => !!v.match(Regexes.UniqueIdentifier)));
                break;
            case 'ShowCustomer':
                inspectData(key, value, validBit);
                break;
        }
    }

    const inspectAll = async (): Promise<boolean> => {
        if (!values)
            return false;

        const v1 = await inspectData('Head', values.Head, hasLength);
        const v2 = await inspectData('Body', values.Body, hasLength);
        const v3 = await inspectData('Sharees', values.Sharees, await every(async v => !!v.match(Regexes.UniqueIdentifier)));
        const v4 = await inspectData('ShowCustomer', values.ShowCustomer, validBit);

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
        context,
        sharees,
        updateData,
        resetData,
        setEdit,
        finalizeUpdate,
        finalizeCreate
    }
}