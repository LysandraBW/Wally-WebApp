import { useEffect, useState } from "react";
import { File, Text, TextArea, Toggle } from "@/components/Input/Export";
import { GetAllEmployees } from "@/lib/Database/Export";
import { UpdateNote } from "@/process/Employee/Update/Form";
import { getSessionID } from "@/lib/Cookies/Cookies";
import { DB_GeneralEmployee } from "@/lib/Database/Types";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";

interface NoteInputProps {
    employeeID: string;
    employees: Array<DB_GeneralEmployee>;
    onChange: (name: string, value: any) => any;
}

export default function NoteInput(props: NoteInputProps) {
    const [values, setValues] = useState<UpdateNote>({
        NoteID: -1,
        EmployeeID: '',
        AppointmentID: '',
        CreationDate: new Date(),
        UpdationDate: new Date(),
        Head: '',
        Body: '',
        Attachments: [],
        Type: 'File',
        ShowCustomer: 0,
        Files: [],
        Sharees: []
    });

    return (
        <div>
            <TextArea
                name={'Head'}
                value={values.Head}
                label={'Head'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <TextArea
                name={'Body'}
                value={values.Body}
                label={'Body'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <File
                name={'Files'}
                label={'Upload Files'}
                onChange={(name, value) => {
                    const files: Array<File> = Array.from(value);
                    setValues({...values, [`${name}`]: files})
                }}
            />
            <Toggle
                name='ShowCustomer'
                label='Show Customer'
                value={values.ShowCustomer}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <div>
                {props.employees.map(employee => {
                    if (employee.EmployeeID === props.employeeID)
                        return <></>;
                    return (
                        <Toggle
                            name='Sharees'
                            label={`Add ${employee.FName} ${employee.LName}`}
                            value={values.Sharees.includes(employee.EmployeeID) ? 1 : 0}
                            onChange={(name, value) => {
                                setValues({...values, Sharees: toggleValue(values.Sharees, employee.EmployeeID)});
                            }}
                        />
                    )
                })}
            </div>
            <button onClick={() => props.onChange('Notes', values)}>Add</button>
        </div>
    )
}