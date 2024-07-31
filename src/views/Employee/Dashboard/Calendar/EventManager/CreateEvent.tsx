import { useContext, useState } from "react";
import { Text,File, TextArea, Toggle } from "@/components/Input/Export";
import { DB_GeneralEmployee } from "@/database/Types";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { UpdateEvent } from "@/process/Employee/Calendar/Form/Form";
import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";

interface CreateEventProps {
    onClose: () => void;
    onCreate: (value: any) => void;
}

const defaultInput: UpdateEvent = {
    EventID:        -1,
    EmployeeID:     '',
    AppointmentID:  '',
    Name:           '',
    Summary:        '',
    Sharees:        [],
    UpdatedEvent:   '',
    Date: new Date()
}

export default function CreateEvent(props: CreateEventProps) {
    const context = useContext(PageContext);
    const [values, setValues] = useState<UpdateEvent>(defaultInput);

    return (
        <div>
            <span
                onClick={() => {
                    props.onClose();
                }}
            >
                x
            </span>
            <TextArea
                name={'Name'}
                value={values.Name}
                label={'Name'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <TextArea
                name={'Summary'}
                value={values.Summary}
                label={'Summary'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                type='datetime-local'
                name='UpdatedEvent'
                value={values.UpdatedEvent}
                label='Date'
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <div>
                {context.Employees.map((employee, i) => (
                    <div key={i}>
                        {/* Cannot Add Yourself as Sharee */}
                        {employee.EmployeeID !== context.Employee.EmployeeID && 
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
                    props.onCreate(values);
                    setValues(defaultInput);
                }
            }>
                Add
            </button>
        </div>
    )
}