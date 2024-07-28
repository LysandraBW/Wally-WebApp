import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { File, Multiple, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/lib/Database/Types";
import { UpdateNote } from "@/process/Employee/Update/Form";
import { useState } from "react";

interface NoteLineProps {
    employeeID: string;
    employees: Array<DB_GeneralEmployee>;
    note: UpdateNote;
    onDelete: () => any;
    onUpdate: (note: UpdateNote) => any;   
}

export default function NoteLine(props: NoteLineProps) {
    const initialHead = props.note.Head;
    const initialBody = props.note.Body;
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.note);

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
                                        setValues({...values, Head: initialHead});
                                    }
                                }}
                            />
                            <input 
                                value={values.Body} 
                                onChange={(event) => setValues({...values, Body: event.target.value})}
                                onBlur={() => {
                                    if (!values.Body) {
                                        setValues({...values, Body: initialBody});
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
                            <Toggle
                                name='ShowCustomer'
                                label='Show Customer'
                                value={values.ShowCustomer}
                                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
                            />
                            <div>
                                {/* Add Key */}
                                {props.employees.map((employee, i) => {
                                    if (employee.EmployeeID === props.employeeID)
                                        return <div key={i}></div>;
                                    return (
                                        <div key={i}>
                                            <Toggle
                                                name='Sharees'
                                                label={`Add ${employee.FName} ${employee.LName}`}
                                                value={values.Sharees.includes(employee.EmployeeID) ? 1 : 0}
                                                onChange={(name, value) => {
                                                    setValues({...values, Sharees: toggleValue(values.Sharees, employee.EmployeeID)});
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={() => {
                                setEdit(false);
                                props.onUpdate(values);
                            }}>Save Changes</button>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>
                        <h4>{props.note.Head}</h4>
                        <p>{props.note.Body}</p>
                        {values.Attachments.map((attachment, i) => (
                            <div key={i}>
                                {attachment.Name}
                            </div>
                        ))}
                    </span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}