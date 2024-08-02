import { useContext, useReducer, useState } from "react";
import { Text, TextArea, Toggle } from "@/components/Input/Export";
import { toggleValue } from "@/components/Input/Checkbox/Checkbox";
import { UpdateEvent } from "@/process/Employee/Calendar/Form/Form";
import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

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
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectName = async (name: string = values.Name): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(name);
        formErrorDispatch({
            name: 'Name',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectSummary = async (summary: string = values.Summary): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(summary);
        formErrorDispatch({
            name: 'Summary',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectSharees = async (sharees: Array<string> = values.Sharees): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(sharees);
        formErrorDispatch({
            name: 'Sharees',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectDate = async (date: string = values.UpdatedEvent): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(date);
        formErrorDispatch({
            name: 'UpdatedEvent',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectEvent = async (): Promise<boolean> => {
        const name = await inspectName();
        const summary = await inspectSummary();
        const sharees = await inspectSharees();
        const date = await inspectDate();

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
                value={values.Name}
                error={formError.input.Name}
                label={'Name'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectName(value);
                }}
            />
            <TextArea
                name={'Summary'}
                value={values.Summary}
                error={formError.input.Summary}
                label={'Summary'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectSummary(value);
                }}
            />
            <Text
                type='datetime-local'
                name='UpdatedEvent'
                value={values.UpdatedEvent}
                error={formError.input.UpdatedEvent}
                label='Date'
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectDate(value);
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
                                error={formError.input.Sharees}
                                onChange={async (name, value) => {
                                    const updatedValue = toggleValue(values.Sharees, employee.EmployeeID);
                                    inspectSharees(updatedValue)
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