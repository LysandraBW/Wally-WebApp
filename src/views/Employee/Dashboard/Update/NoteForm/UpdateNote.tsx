import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { File, Multiple, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { UpdateNote as UpdateNoteData } from "@/process/Employee/Update/Form/Form/Note/Note";
import { useContext, useState } from "react";

interface UpdateNoteProps {
    note: UpdateNoteData;
    onDelete: () => any;
    onUpdate: (note: UpdateNoteData) => any;   
}

export default function UpdateNote(props: UpdateNoteProps) {
    const context = useContext(PageContext);
    const initiailNoteData = {...props.note};

    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.note);

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
                            <input 
                                value={values.Head} 
                                onChange={(event) => setValues({...values, Head: event.target.value})}
                                onBlur={() => {
                                    if (!values.Head) {
                                        setValues({...values, Head: initiailNoteData.Head});
                                    }
                                }}
                            />
                            <input 
                                value={values.Body} 
                                onChange={(event) => setValues({...values, Body: event.target.value})}
                                onBlur={() => {
                                    if (!values.Body) {
                                        setValues({...values, Body: initiailNoteData.Body});
                                    }
                                }}
                            />
                            {values.Attachments.map((attachment, i) => (
                                <div key={i}>
                                    {attachment.Name} <span onClick={() => setValues({...values, Attachments: values.Attachments.filter(_attachment => attachment !== _attachment)})}>x</span>
                                </div>
                            ))}
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
                            {isOwner() &&
                                <Toggle
                                    name='ShowCustomer'
                                    label='Show Customer'
                                    value={values.ShowCustomer}
                                    onChange={(name, value) => setValues({...values, [`${name}`]: value})}
                                />
                            }
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
                                                    onChange={(name, value) => {
                                                        setValues({...values, Sharees: toggleValue(values.Sharees, employee.EmployeeID)});
                                                    }}
                                                />
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <button 
                                onClick={() => {
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