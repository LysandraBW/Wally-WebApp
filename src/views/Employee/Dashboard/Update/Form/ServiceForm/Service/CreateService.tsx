import { Text } from "@/components/Input/Export";
import { DB_AppointmentService, DB_Service } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/validation/Validation";
import { useEffect, useReducer, useState } from "react";

interface CreateServiceProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_AppointmentService = {
    AppointmentID:          '',
    AppointmentServiceID:   0,
    ServiceID:              null,
    Service:                '',
    Division:               '',
    Class:                  ''
}

export default function CreateService(props: CreateServiceProps) {
    const [values, setValues] = useState<DB_AppointmentService>(defaultInput);
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

    const inspectServiceInput = async (): Promise<boolean> => {
        const classState = await inspectInput('Class', values.Class, hasValue);
        const serviceState = await inspectInput('Service', values.Service, hasValue);
        const divisionState = await inspectInput('Division', values.Division, hasValue);
        return serviceState && divisionState && classState;
    }

    return (
        <div>
            <Text
                name={'Service'}
                label={'Service'}
                value={values.Service}
                error={formState.input.Service}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Service', values.Service, hasValue);
                }}
            />
            <Text
                name={'Division'}
                value={values.Division}
                error={formState.input.Division}
                label={'Division'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Division', values.Division, hasValue);
                }}
            />
            <Text
                name={'Class'}
                value={values.Class}
                error={formState.input.Class}
                label={'Class'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Class', values.Class, hasValue);
                }}
            />
            <button 
                onClick={async () => {
                    if (!(await inspectServiceInput()))
                        return;
                    props.onChange('Services', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}