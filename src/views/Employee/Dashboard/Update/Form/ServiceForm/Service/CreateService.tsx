import { Text } from "@/components/Input/Export";
import { DB_AppointmentService } from "@/database/Types";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { hasLength } from "@/validation/Validation";
import { useReducer, useState } from "react";

interface CreateServiceProps {
    onChange: (name: string, value: any) => any;
}

const defaultValues: DB_AppointmentService = {
    AppointmentID:          '',
    AppointmentServiceID:   0,
    ServiceID:              null,
    Service:                '',
    Division:               '',
    Class:                  ''
}

export default function CreateService(props: CreateServiceProps) {
    const [values, setValues] = useState<DB_AppointmentService>(defaultValues);
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
    
    const inspectService = async (): Promise<boolean> => {
        const validClass = await inspectInput('Class', values.Class, hasLength);
        const validState = await inspectInput('Service', values.Service, hasLength);
        const validDivision = await inspectInput('Division', values.Division, hasLength);
        return validState && validDivision && validClass;
    }

    return (
        <div>
            <Text
                name={'Service'}
                label={'Service'}
                value={values.Service}
                state={formState.input.Service}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Service', values.Service, hasLength);
                }}
            />
            <Text
                name={'Division'}
                value={values.Division}
                state={formState.input.Division}
                label={'Division'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Division', values.Division, hasLength);
                }}
            />
            <Text
                name={'Class'}
                value={values.Class}
                state={formState.input.Class}
                label={'Class'}
                onChange={async (name, value) => {
                    setValues({...values, [`${name}`]: value});
                    inspectInput('Class', values.Class, hasLength);
                }}
            />
            <button 
                onClick={async () => {
                    if (!(await inspectService()))
                        return;
                    props.onChange('Services', values);
                    setValues(defaultValues);
                }}
            >
                Add
            </button>
        </div>
    )
}