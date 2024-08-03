import { useContext, useReducer, useState } from "react";
import { Text, TextArea, Toggle } from "@/components/Input/Export";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { UpdateEvent } from "@/process/Employee/Calendar/Form/Form";
import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue, validDate } from "@/validation/Validation";
import { every } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { Regexes } from "@/lib/Inspector/Inspectors";

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
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectEvent = async (): Promise<boolean> => {
        const name = await inspectInput('Name', values.Name, hasValue);
        const summary = await inspectInput('Summary', values.Summary, hasValue);
        const sharees = await inspectInput('Sharees', values.Sharees, async (v) => await every({
            callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
        }).inspect(v));
        const date = await inspectInput('UpdatedEvent', values.UpdatedEvent, validDate);

        return name && summary && sharees && date;
    }

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
                label={'Name'}
                value={values.Name}
                error={formState.input.Name}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Name', values.Name, hasValue);
                }}
            />
            <TextArea
                name={'Summary'}
                label={'Summary'}
                value={values.Summary}
                error={formState.input.Summary}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Summary', values.Summary, hasValue);
                }}
            />
            <Text
                type='datetime-local'
                name='UpdatedEvent'
                label='Date'
                value={values.UpdatedEvent}
                error={formState.input.UpdatedEvent}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('UpdatedEvent', values.UpdatedEvent, validDate);
                }}
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
                                error={formState.input.Sharees}
                                onChange={async (name, value) => {
                                    const updatedValue = toggleValue(values.Sharees, employee.EmployeeID);
                                    inspectInput('Sharees', updatedValue, async (v) => await every({
                                        callback: (v: string) => !!v.match(Regexes.UniqueIdentifier)
                                    }).inspect(v));
                                    setValues({...values, Sharees: updatedValue});
                                }}
                            />
                        }
                    </div>
                ))}
            </div>
            <button 
                onClick={async () => {
                    if (!(await inspectEvent()))
                        return false;
                    props.onCreate(values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}