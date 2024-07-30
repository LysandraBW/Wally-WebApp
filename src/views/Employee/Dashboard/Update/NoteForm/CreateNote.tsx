import { useContext, useState } from "react";
import { File, TextArea, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { PageContext } from "@/app/Employee/Dashboard/Update/page";
import { UpdateNote } from "@/process/Employee/Update/Form/Form/Note/Note";

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
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
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
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}