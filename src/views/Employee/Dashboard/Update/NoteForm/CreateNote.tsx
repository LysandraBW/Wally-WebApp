import { useContext, useReducer, useState } from "react";
import { File, TextArea, Toggle } from "@/components/Input/Export";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { UpdateNote } from "@/process/Employee/Update/Form/Form/Note/Note";
import { every, hasValue, inValues } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { Regexes } from "@/lib/Inspector/Inspectors";

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

    const inspectHead = async (head: string = values.Head): Promise<boolean> => {
        const [headState, headMessage] = await hasValue().inspect(head);
        formStateDispatch({
            name: 'Head',
            state: [headState, headMessage]
        });
        return headState;
    }

    const inspectBody = async (body: string = values.Body): Promise<boolean> => {
        const [bodyState, bodyMessage] = await hasValue().inspect(body);
        formStateDispatch({
            name: 'Body',
            state: [bodyState, bodyMessage]
        });
        return bodyState;
    }

    const inspectShowCustomer = async (showCustomer: number = values.ShowCustomer): Promise<boolean> => {
        const [showCustomerState, showCustomerMessage] = await inValues({
            values: [0, 1]
        }).inspect([showCustomer]);
        formStateDispatch({
            name: 'ShowCustomer',
            state: [showCustomerState, showCustomerMessage]
        });
        return showCustomerState;
    }

    const inspectSharees = async (sharees: Array<string> = values.Sharees): Promise<boolean> => {
        const [shareesState, shareesMessage] = await every({
            callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
        }).inspect(sharees);
        formStateDispatch({
            name: 'Sharees',
            state: [shareesState, shareesMessage]
        });
        return shareesState;
    }

    const inspectNote = async (): Promise<boolean> => {
        const head = await inspectHead();
        const body = await inspectBody();
        const showCustomer = await inspectShowCustomer();
        const sharees = await inspectSharees();
        return head && body && showCustomer && sharees;
    }

    return (
        <div>
            <TextArea
                name={'Head'}
                value={values.Head}
                error={formState.input.Head}
                label={'Head'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectHead(value);
                }}
            />
            <TextArea
                name={'Body'}
                value={values.Body}
                error={formState.input.Body}
                label={'Body'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectBody(value);
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
                    inspectShowCustomer(value);
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
                                    inspectSharees(updatedValue)
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