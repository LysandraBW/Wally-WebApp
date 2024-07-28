import { useState } from "react";
import { File, TextArea, Toggle } from "@/components/Input/Export";
import { UpdateNote } from "@/process/Employee/Update/Form";
import { DB_GeneralEmployee } from "@/lib/Database/Types";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";

interface NoteInputProps {
    employeeID: string;
    employees: Array<DB_GeneralEmployee>;
    onChange: (name: string, value: any) => any;
}

const blankNoteInput: UpdateNote = {
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
    Files: null,
    Sharees: []
}

export default function NoteInput(props: NoteInputProps) {
    const [values, setValues] = useState<UpdateNote>(blankNoteInput);

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
                multiple={true}
                onChange={(name, value) => {
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
            <button 
                onClick={() => {
                    props.onChange('Notes', values);
                    setValues(blankNoteInput);
                }
            }>
                Add
            </button>
        </div>
    )
}