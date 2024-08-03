import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { File, Multiple, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { Regexes } from "@/lib/Inspector/Inspectors";
import { UpdateNote as UpdateNoteData } from "@/process/Employee/Update/Form/Form/Note/Note";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useContext, useEffect, useReducer, useState } from "react";
import { hasValue } from "@/validation/Validation";
import { every, inValues } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

interface UpdateNoteProps {
    note: UpdateNoteData;
    onDelete: () => any;
    onUpdate: (note: UpdateNoteData) => any;   
    updateFormState: (state: boolean) => void;
}

export default function UpdateNote(props: UpdateNoteProps) {
    const context = useContext(PageContext);
    const initialValues = {...props.note};
    const [values, setValues] = useState(props.note);
    const [edit, setEdit] = useState(false);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);
    
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

    const noteOwnerData = (): DB_GeneralEmployee => {
        // New Note
        if (props.note.NoteID === -1)
            return context.Employee.Employee;

        // Modified Note
        for (const employee of context.Employee.Employees)
            if (employee.EmployeeID === props.note.EmployeeID)
                return employee;

        // Default Return
        return {
            EmployeeID: '',
            FName: '',
            LName: ''
        }
    }

    const isOwner = (employeeID: string = context.Employee.Employee.EmployeeID): boolean => {
        return employeeID === props.note.EmployeeID || props.note.NoteID === -1;
    }

    const getOwnerTag = (): React.ReactNode => {
        const employeeData = noteOwnerData();
        return (<p>Owned By: {employeeData.FName} {employeeData.LName}</p>);
    }

    // Take the filter function out and put it in its own function,
    // I don't like elements being up here anymore.
    // Moreover, more abstraction with the components.
    const getSharedWith = (): React.ReactNode => {
        if (!isOwner())
            return <></>;
        return (
            <ul>
                Shared With:
                {context.Employee.Employees.filter(e => values.Sharees.includes(e.EmployeeID)).map((employee, i) => (
                    <li key={i}>{employee.FName} {employee.LName}</li>
                ))}
            </ul>
        );
    }

    return (
        <>
            {edit && 
                <Multiple
                    onBlur={() => 1}
                    children={(
                        <div>
                            <div>
                                <input 
                                    value={values.Head} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Head: value});
                                        inspectInput('Head', value, hasValue);
                                    }}
                                    onBlur={async () => {
                                        if (values.Head)
                                            return;
                                        setValues({...values, Head: initialValues.Head});
                                        inspectInput('Head', initialValues.Head, hasValue);
                                    }}
                                />
                                {formState.input.Head && !formState.input.Head.state &&
                                    <span>{formState.input.Head.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Body} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Body: value});
                                        inspectInput('Body', value, hasValue);
                                    }}
                                    onBlur={async () => {
                                        if (values.Body)
                                            return;
                                        setValues({...values, Body: initialValues.Body});
                                        inspectInput('Body', initialValues.Body, hasValue);
                                    }}
                                />
                                {formState.input.Body && !formState.input.Body.state &&
                                    <span>{formState.input.Body.message}</span>
                                }
                            </div>
                            {/* Deleting Existing Attachments */}
                            {values.Attachments.map((attachment, i) => (
                                <div key={i}>
                                    {attachment.Name} 
                                    <span 
                                        onClick={() => {
                                            setValues({
                                                ...values, 
                                                Attachments: values.Attachments.filter(_attachment => attachment !== _attachment)
                                            });
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            ))}
                            {/* Reuploading New Attachments */}
                            <div>
                                <File
                                    name={'Files'}
                                    label={'Reupload Files'}
                                    multiple={true}
                                    onChange={(name, value) => {
                                        const formData = new FormData();
                                        for (let i = 0; i < value.length; i++)
                                            formData.append('Files', value[i]);
                                        setValues({...values, [`${name}`]: formData});
                                    }}
                                />
                            </div>
                            <div>
                                {isOwner() &&
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
                                }
                                {formState.input.ShowCustomer && !formState.input.ShowCustomer.state &&
                                    <span>{formState.input.ShowCustomer.message}</span>
                                }
                            </div>
                            <div>
                                {isOwner() &&
                                    context.Employee.Employees.map((employee, i) => (
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
                                            {formState.input.Sharees && !formState.input.Sharees.state &&
                                                <span>{formState.input.Sharees.message}</span>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <button 
                                onClick={() => {
                                    if (!formState.state)
                                        return;
                                    setEdit(false);
                                    props.onUpdate(values);
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    {/* Cannot Update a Non-Owned Note */}
                    <span onClick={() => setEdit(isOwner())}>
                        <h4>{props.note.Head}</h4>
                        <p>{props.note.Body}</p>
                        {values.Attachments.map((attachment, i) => (
                            <div key={i}>
                                {attachment.Name}
                            </div>
                        ))}
                        {getOwnerTag()}
                        {getSharedWith()}
                    </span>
                    <span onClick={() => props.onDelete()}>{isOwner() ? 'DELETE' : 'REMOVE'}</span>
                </div>
            }
        </>
    )
}