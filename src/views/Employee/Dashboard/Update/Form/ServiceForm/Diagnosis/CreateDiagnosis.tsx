import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { hasLength } from "@/validation/Validation";
import AddButton from "@/components/Button/Text/Add";

interface CreateDiagnosisProps {
    onChange: (name: string, value: any) => any;
}

const defaultValues: DB_Diagnosis = {
    DiagnosisID:    0,
    Code:           '',
    Message:        '',
}

export default function CreateDiagnosis(props: CreateDiagnosisProps) {
    const [values, setValues] = useState<DB_Diagnosis>(defaultValues);
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

    const inspectDiagnosis = async (): Promise<boolean> => {
        const codeState = await inspectInput('Code', values.Code, hasLength);
        const messageState = await inspectInput('Message', values.Message, hasLength);
        return codeState && messageState;
    }
    
    return (
        <div>
            <Text
                name={'Code'}
                label={'Code'}
                value={values.Code}
                state={formState.input.Code}
                onChange={async (name, value) => {
                    inspectInput(name, value, hasLength);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Message'}
                label={'Message'}
                value={values.Message}
                state={formState.input.Message}
                onChange={async (name, value) => {
                    inspectInput(name, value, hasLength);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <AddButton 
                onClick={async () => {
                    if (!(await inspectDiagnosis()))
                        return;
                    props.onChange('Diagnoses', values);
                    setValues(defaultValues);
                }}
            />
        </div>
    )
}