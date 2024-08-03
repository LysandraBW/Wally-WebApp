import { useContext, useReducer, useState } from "react";
import { File, TextArea, Toggle } from "@/components/Input/Export";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { UpdateNote } from "@/process/Employee/Update/Form/Form/Note/Note";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { Regexes } from "@/lib/Inspector/Inspectors";
import { hasValue } from "@/validation/Validation";
import { every, inValues } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

interface NoteInputProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: UpdateNote = {
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
    const [values, setValues] = useState<UpdateNote>(defaultInput);
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
        const head = await inspectInput('Head', values.Head, hasValue);
        const body = await inspectInput('Body', values.Body, hasValue);
        const showCustomer = await inspectInput('ShowCustomer', values.ShowCustomer, async (v) => await inValues({
            values: [0, 1]
        }).inspect(v));
        const sharees = await inspectInput('Sharees', values.Sharees, async (v) => await every({
            callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
        }).inspect(v));
        
        return head && body && showCustomer && sharees;
    }

    return (
        <div>
            <TextArea
                name={'Head'}
                label={'Head'}
                value={values.Head}
                error={formState.input.Head}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Head', value, hasValue);
                }}
            />
            <TextArea
                name={'Body'}
                label={'Body'}
                value={values.Body}
                error={formState.input.Body}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Body', value, hasValue);
                }}
            />
            <File
                name={'Files'}
                label={'Upload Files'}
                multiple={true}
                onChange={(name, value) => {
                    // We store each file in a FormData object,
                    // so that we can send the file to the server-side.
                    // This likely could have been done a better way
                    // had I planned better.
                    // Also maybe use the File folder in lib to store a function for this,
                    // since you already have it in two areas.
                    const formData = new FormData();
                    for (let i = 0; i < value.length; i++)
                        formData.append('Files', value[i]);
                    setValues({...values, [`${name}`]: formData});
                }}
            />
            <Toggle
                name='ShowCustomer'
                label='Show Customer'
                value={values.ShowCustomer}
                error={formState.input.ShowCustomer}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('ShowCustomer', value, async (v) => await inValues({
                        values: [0, 1]
                    }).inspect(v));
                }}
            />
            <div>
                {context.Employee.Employees.map((employee, i) => (
                    <div key={i}>
                        {/* Cannot Add Yourself as Sharee */}
                        {employee.EmployeeID !== context.Employee.Employee.EmployeeID && 
                            <Toggle
                                name='Sharees'
                                label={`Add ${employee.FName} ${employee.LName}`}
                                value={values.Sharees.includes(employee.EmployeeID) ? 1 : 0}
                                error={formState.input.Sharees}
                                onChange={async (name, value) => {
                                    const updatedValue = toggleValue(values.Sharees, employee.EmployeeID);
                                    setValues({...values, Sharees: updatedValue});
                                    inspectInput('Sharees', updatedValue, async (v) => await every({
                                        callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
                                    }).inspect(v));
                                }}
                            />
                        }
                    </div>
                ))}
            </div>
            <button 
                onClick={async () => {
                    if (!(await inspectNote()))
                        return;
                    props.onChange('Notes', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}