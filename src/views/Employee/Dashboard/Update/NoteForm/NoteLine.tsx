import { Text } from "@/components/Input/Export";
import { getSessionID } from "@/lib/Authorize/Authorize";
import { Attachment } from "@/lib/Database/Appointment/Note/Select";
import { NoteSharee } from "@/lib/Database/Appointment/SharedNote/Select";
import { GetAllReturnType as Employee } from "@/lib/Database/Employee/Employee";
import { GetAllEmployees } from "@/lib/Database/Export";
import { useEffect, useState } from "react";

interface RepairLineProps {
    note: {
        Head: string;
        Body: string;
        Attachments: Array<['Attachment', Attachment] | ['File', File]>;
        ShowCustomer: number;
        Sharees: Array<NoteSharee>;
    }
    onDelete: () => any;
    onUpdate: (note: {Head: string;
        Body: string;
        Attachments: Array<['Attachment', Attachment] | ['File', File]>;
        ShowCustomer: number;
        Sharees: Array<NoteSharee>;}) => any;   
}

export default function NoteLine(props: RepairLineProps) {
    const initialHead = props.note.Head;
    const initialBody = props.note.Body;
    
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.note);

    const [employees, setEmployees] = useState<Array<Employee>>();

    useEffect(() => {
        const loadEmployees = async () => {
            const employees = await GetAllEmployees({ SessionID: await getSessionID() });
            setEmployees(employees);
        }
        loadEmployees()
    }, []);

    return (
        <>
            {edit && 
                <div
                    tabIndex={0}
                    onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                            return;
                        setEdit(false)
                        props.onUpdate(values);
                    }}
                >
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
                        <>
                            {attachment[0] === 'Attachment' && attachment[1].Name}
                            {attachment[0] === 'File' && attachment[1].name}
                        </>
                    ))}
                    <div
                        onClick={() => {
                            setValues({...values, 'ShowCustomer': 1 - values.ShowCustomer})
                        }}
                    >
                        Show Customer: <span>{values.ShowCustomer ? 'YES' : 'NO'}</span>
                    </div>
                    <div>
                        {employees && employees.map(employee => (
                            <div
                                onClick={() => {
                                    // quick and easy unforuntately will change this absolutely ugly code later
                                    const found = values.Sharees.map(sharee => sharee.ShareeID).includes(employee.EmployeeID);
                                    let updatedSharees = values.Sharees;
                                    if (found) {
                                        updatedSharees = updatedSharees.filter(sharee => sharee.ShareeID !== employee.EmployeeID);
                                    }
                                    else {
                                        updatedSharees.push({
                                            ShareeFName: employee.FName,
                                            ShareeLName: employee.LName,
                                            ShareeID: employee.EmployeeID
                                        });
                                    }
                                    setValues({...values, 'ShowCustomer': 1 - values.ShowCustomer})
                                }}
                            >
                                {employee.FName} {employee.LName} <span>{values.Sharees.map(sharee => sharee.ShareeID).includes(employee.EmployeeID) ? 'YES' : 'NO'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>
                        <h4>{props.note.Head}</h4>
                        <p>{props.note.Body}</p>
                        {props.note.Attachments && props.note.Attachments.map(attachment => (
                            <div>{attachment[0] === 'Attachment' ? attachment[1].Name : attachment[1].name}</div>
                        ))}
                    </span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}