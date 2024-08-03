import { useContext, useReducer, useState } from "react";
import { File, TextArea, Toggle, ToggleGroup } from "@/components/Input/Export";
import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { UpdateNote } from "@/submission/Employee/Update/Form/Form/Note/Note";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { Regexes } from "@/lib/Inspector/Inspectors";
import { eachEntry, contains, validBit } from "@/validation/Validation";
import AddButton from "@/components/Button/Text/Add";
import { fileListToFormData } from "@/lib/Files/FileData";

interface NoteInputProps {
    onChange: (name: string, value: any) => any;
}

const defaultValues: UpdateNote = {
    NoteID:         -1,
    EmployeeID:     '',
    AppointmentID:  '',
    Head:           '',
    Body:           '',
    Type:           'File',
    Files:          null,
    ShowCustomer:   0,
    Attachments:    [],
    Sharees:        [],
    CreationDate:   new Date(),
    UpdationDate:   new Date(),
}

export default function CreateNote(props: NoteInputProps) {
    const context = useContext(PageContext);
    const [values, setValues] = useState<UpdateNote>(defaultValues);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectNote = async (): Promise<boolean> => {
        const head = await inspectInput('Head', values.Head, contains);
        const body = await inspectInput('Body', values.Body, contains);
        const showCustomer = await inspectInput('ShowCustomer', values.ShowCustomer, validBit);
        const sharees = await inspectInput('Sharees', values.Sharees, await eachEntry(async (v) => (
            !!v.match(Regexes.UniqueIdentifier)
        )));
        return head && body && showCustomer && sharees;
    }

    return (
        <div>
            <TextArea
                name={'Head'}
                label={'Head'}
                value={values.Head}
                state={formState.input.Head}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Head', value, contains);
                }}
            />
            <TextArea
                name={'Body'}
                label={'Body'}
                value={values.Body}
                state={formState.input.Body}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Body', value, contains);
                }}
            />
            <File
                name={'Files'}
                label={'Upload Files'}
                multiple={true}
                onChange={(name, value) => {
                    // Each File of the FileList is stored in an entry of a FormData
                    setValues({...values, [`${name}`]: fileListToFormData(value)});
                }}
            />
            <Toggle
                name='ShowCustomer'
                label='Show Customer'
                value={values.ShowCustomer}
                state={formState.input.ShowCustomer}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('ShowCustomer', value, validBit);
                }}
            />
            <ToggleGroup
                name='Sharees'
                label='Sharees'
                value={values.Sharees}
                values={context.Employee.Employees.filter(e => (
                    e.EmployeeID != context.Employee.Employee.EmployeeID
                )).map(e => [e.EmployeeID, `${e.FName} ${e.LName}`])}
                onChange={async (name, value) => {
                    inspectInput('Sharees', value, await eachEntry(async (v) => !!v.match(Regexes.UniqueIdentifier)));
                    setValues({...values, Sharees: value});
                }}
            />
            <AddButton
                onClick={async () => {
                    if (!(await inspectNote()))
                        return;
                    props.onChange('Notes', values);
                    setValues(defaultValues);
                }}
            />
        </div>
    )
}