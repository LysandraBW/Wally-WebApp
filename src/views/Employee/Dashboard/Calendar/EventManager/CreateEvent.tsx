import { useContext, useReducer, useState } from "react";
import { Text, TextArea, ToggleGroup } from "@/components/Input/Export";
import { UpdateEvent } from "@/submission/Employee/Calendar/Form";
import { PageContext } from "@/app/Employee/Dashboard/Calendar/page";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { every, hasLength, validDate } from "@/validation/Validation";
import CloseButton from "@/components/Button/Icon/Close";
import AddButton from "@/components/Button/Text/Add";
import { Regexes } from "@/validation/Regexes";

interface CreateEventProps {
    onClose: () => void;
    onCreate: (value: any) => void;
}

const defaultValues: UpdateEvent = {
    EventID:        -1,
    EmployeeID:     '',
    AppointmentID:  '',
    Name:           '',
    Summary:        '',
    Sharees:        [],
    UpdatedDate:   '',
    Date: new Date()
}

export default function CreateEvent(props: CreateEventProps) {
    const context = useContext(PageContext);
    const [values, setValues] = useState(defaultValues);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            states: {
                [`${inputName}`]: [errState, errMessage]
            }
        });
        return errState;
    }

    const inspectEvent = async (): Promise<boolean> => {
        const validName = await inspectInput('Name', values.Name, hasLength);
        const validSummary = await inspectInput('Summary', values.Summary, hasLength);
        const validSharees = await inspectInput('Sharees', values.Sharees, await every(async (v) => (
            !!v.match(Regexes.UniqueIdentifier)
        )));
        const validUpdatedDate = await inspectInput('UpdatedDate', values.UpdatedDate, validDate);
        return validName && validSummary && validSharees && validUpdatedDate;
    }

    return (
        <div>
            <CloseButton
                onClick={props.onClose}
            />
            <TextArea
                name={'Name'}
                label={'Name'}
                value={values.Name}
                state={formState.input.Name}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Name', values.Name, hasLength);
                }}
            />
            <TextArea
                name={'Summary'}
                label={'Summary'}
                value={values.Summary}
                state={formState.input.Summary}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Summary', values.Summary, hasLength);
                }}
            />
            <Text
                type='datetime-local'
                name='UpdatedDate'
                label='Date'
                value={values.UpdatedDate}
                state={formState.input.UpdatedDate}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('UpdatedDate', values.UpdatedDate, validDate);
                }}
            />
            <ToggleGroup
                name='Sharees'
                label='Sharees'
                value={values.Sharees}
                values={context.Employees.filter(e => e.EmployeeID != context.Employee.EmployeeID).map(e => [e.EmployeeID, `${e.FName} ${e.LName}`])}
                onChange={async (name, value) => {
                    inspectInput('Sharees', value, await every(async (v) => !!v.match(Regexes.UniqueIdentifier)));
                    setValues({...values, Sharees: value});
                }}
            />
            <AddButton 
                onClick={async () => {
                    if (!(await inspectEvent()))
                        return false;
                    props.onCreate(values);
                    setValues(defaultValues);
                }}
            />
        </div>
    )
}