import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/validation/Validation";

interface CreateDiagnosisProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_Diagnosis = {
    DiagnosisID:    0,
    Code:           '',
    Message:        '',
}

export default function CreateDiagnosis(props: CreateDiagnosisProps) {
    const [values, setValues] = useState<DB_Diagnosis>(defaultInput);
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

    const inspectDiagnosis = async (): Promise<boolean> => {
        const codeState = await inspectInput('Code', values.Code, hasValue);
        const messageState = await inspectInput('Message', values.Message, hasValue);
        return codeState && messageState;
    }
    
    return (
        <div>
            <Text
                name={'Code'}
                label={'Code'}
                value={values.Code}
                error={formState.input.Code}
                onChange={async (name, value) => {
                    inspectInput(name, value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Message'}
                label={'Message'}
                value={values.Message}
                error={formState.input.Message}
                onChange={async (name, value) => {
                    inspectInput(name, value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <button 
                onClick={async () => {
                    if (!(await inspectDiagnosis()))
                        return;
                    props.onChange('Diagnoses', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}