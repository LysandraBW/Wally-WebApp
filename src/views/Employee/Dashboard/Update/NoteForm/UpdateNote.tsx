import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { File, Multiple, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { every, hasValue, inValues } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { ErrorStructure, Regexes } from "@/lib/Inspector/Inspectors";
import { UpdateNote as UpdateNoteData } from "@/process/Employee/Update/Form/Form/Note/Note";
import FormStateReducer, { InitialFormState } from "@/reducer/FormState/Reducer";
import { useContext, useEffect, useReducer, useState } from "react";

interface UpdateNoteProps {
    note: UpdateNoteData;
    onDelete: () => any;
    onUpdate: (note: UpdateNoteData) => any;   
    updateFormError: (state: boolean) => void;
}

export default function UpdateNote(props: UpdateNoteProps) {
    const context = useContext(PageContext);
    const initialNoteData = {...props.note};

    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.note);

    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);

    const inspectHead = async (head: string = values.Head): Promise<boolean> => {
        const [headState, headMessage] = await hasValue().inspect(head);
        formErrorDispatch({
            name: 'Head',
            state: [headState, headMessage]
        });
        return headState;
    }

    const inspectBody = async (body: string = values.Body): Promise<boolean> => {
        const [bodyState, bodyMessage] = await hasValue().inspect(body);
        formErrorDispatch({
            name: 'Body',
            state: [bodyState, bodyMessage]
        });
        return bodyState;
    }

    const inspectShowCustomer = async (showCustomer: number = values.ShowCustomer): Promise<boolean> => {
        const [showCustomerState, showCustomerMessage] = await inValues({
            values: [0, 1]
        }).inspect([showCustomer]);
        formErrorDispatch({
            name: 'ShowCustomer',
            state: [showCustomerState, showCustomerMessage]
        });
        return showCustomerState;
    }

    const inspectSharees = async (sharees: Array<string> = values.Sharees): Promise<boolean> => {
        const [shareesState, shareesMessage] = await every({
            callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
        }).inspect(sharees);
        formErrorDispatch({
            name: 'Sharees',
            state: [shareesState, shareesMessage]
        });
        return shareesState;
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
    // I don't like elements being up here anymore
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
                                        inspectHead(value);
                                    }}
                                    onBlur={async () => {
                                        if (values.Head)
                                            return;

                                        setValues({...values, Head: initialNoteData.Head});
                                        inspectHead(initialNoteData.Head);
                                    }}
                                />
                                {formError.input.Head && !formError.input.Head.state &&
                                    <span>{formError.input.Head.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Body} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Body: value});
                                        inspectBody(value);
                                    }}
                                    onBlur={async () => {
                                        if (values.Body)
                                            return;
                                    
                                        setValues({...values, Body: initialNoteData.Body});
                                        inspectBody(initialNoteData.Body);
                                    }}
                                />
                                {formError.input.Body && !formError.input.Body.state &&
                                    <span>{formError.input.Body.message}</span>
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
                                        error={formError.input.ShowCustomer}
                                        onChange={async (name, value) => {
                                            setValues({...values, [`${name}`]: value});
                                            inspectShowCustomer(value);
                                        }}
                                    />   
                                }
                                {formError.input.ShowCustomer && !formError.input.ShowCustomer.state &&
                                    <span>{formError.input.ShowCustomer.message}</span>
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
                                                    error={formError.input.Sharees}
                                                    onChange={async (name, value) => {
                                                        const updatedValue = toggleValue(values.Sharees, employee.EmployeeID);
                                                        inspectSharees(updatedValue);
                                                        setValues({...values, Sharees: updatedValue});
                                                    }}
                                                />
                                            }
                                            {formError.input.Sharees && !formError.input.Sharees.state &&
                                                <span>{formError.input.Sharees.message}</span>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <button 
                                onClick={() => {
                                    if (!formError.state)
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