import { useEffect, useState } from "react";
import { File, Text, TextArea } from "@/components/Input/Export";
import { NoteSharee } from "@/lib/Database/Appointment/SharedNote/Select";
import { GetAllReturnType as Employee } from "@/lib/Database/Employee/Employee";
import { GetAllEmployees } from "@/lib/Database/Export";
import { getSessionID } from "@/lib/Authorize/Authorize";

interface NoteInputProps {
    employeeID: number;
    onChange: (name: string, value: any) => any;
}

export default function NoteInput(props: NoteInputProps) {
    const [values, setValues] = useState<{
        Head: string;
        Body: string;
        Attachment: Array<File>;
        ShowCustomer: number;
        Sharees: Array<NoteSharee>;
    }>({
        Head: '',
        Body: '',
        Attachment: [],
        ShowCustomer: 0,
        Sharees: []
    });
    
    const [employees, setEmployees] = useState<Array<Employee>>();

    useEffect(() => {
        const loadEmployees = async () => {
            const employees = await GetAllEmployees({ SessionID: await getSessionID() });
            setEmployees(employees);
        }
        loadEmployees()
    }, []);

    return (
        
        <div>
            <TextArea
                name={'Notes'}
                value={values.Head}
                label={'Head'}
                onChange={(name, value) => {
                    setValues({...values, 'Head': value});
                }}
            />
            <TextArea
                name={'Notes'}
                value={values.Body}
                label={'Body'}
                onChange={(name, value) => {
                    setValues({...values, 'Body': value});
                }}
            />
            <File
                name={'Notes'}
                label={'Upload Files'}
                onChange={(name, value) => {
                    const files: Array<File> = Array.from(value);
                    setValues({...values, 'Attachment': [...values.Attachment, ...files]})
                }}
            />
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
            <button
                onClick={() => {
                    props.onChange('Notes', values);
                }}
            >
                Add
            </button>
        </div>
    )
}