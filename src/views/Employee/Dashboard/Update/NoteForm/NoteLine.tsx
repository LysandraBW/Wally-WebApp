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
    const ref = {...props.note};
    const owner = {
        owner:  props.note.EmployeeID === props.employeeID,
        data: props.employees.find(e => e.EmployeeID === props.note.EmployeeID)
    }
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
                                        setValues({...values, Head: ref.Head});
                                    }
                                }}
                            />
                            <input 
                                value={values.Body} 
                                onChange={(event) => setValues({...values, Body: event.target.value})}
                                onBlur={() => {
                                    if (!values.Body) {
                                        setValues({...values, Body: ref.Body});
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
                                {props.employees.map((employee, i) => (
                                    <div key={i}>
                                        {/* Cannot Add Yourself as Sharee */}
                                        {employee.EmployeeID !== props.employeeID && 
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
                                ))}
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
                    {/* Cannot Update a Non-Owned Note */}
                    <span onClick={() => setEdit(owner.owner)}>
                        <h4>{props.note.Head}</h4>
                        <p>{props.note.Body}</p>
                        {values.Attachments.map((attachment, i) => (
                            <div key={i}>
                                {attachment.Name}
                            </div>
                        ))}
                        {owner.data && <p>Shared By: {owner.data.FName} {owner.data.LName}</p>}
                        {owner.owner && 
                            <ul>
                                Shared With:
                                {props.employees.map(employee => (
                                    <li>
                                        {values.Sharees.includes(employee.EmployeeID) &&
                                            <>{employee.FName} {employee.LName}</>
                                        }
                                    </li>
                                ))}
                            </ul>
                        }
                    </span>
                    <span onClick={() => props.onDelete()}>{owner.owner ? 'DELETE' : 'REMOVE'}</span>
                </div>
            }
        </>
    )
}