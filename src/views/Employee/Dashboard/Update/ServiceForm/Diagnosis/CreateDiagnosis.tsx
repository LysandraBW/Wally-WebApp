import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/reducer/FormState/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

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
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectCode = async (code: string = values.Code): Promise<boolean> => {
        const [codeState, codeMessage] = await hasValue().inspect(code);
        formErrorDispatch({
            name: 'Code',
            state: [codeState, codeMessage]
        });
        return codeState;
    }

    const inspectMessage = async (message: string = values.Message): Promise<boolean> => {
        const [messageState, messageMessage] = await hasValue().inspect(message);
        formErrorDispatch({
            name: 'Message',
            state: [messageState, messageMessage]
        });
        return messageState;
    }

    const inspectDiagnosis = async (): Promise<boolean> => {
        return await inspectCode() && await inspectMessage()
    }
    
    return (
        <div>
            <Text
                name={'Code'}
                value={values.Code}
                error={formError.input.Code}
                label={'Code'}
                onChange={async (name, value) => {
                    inspectCode(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Message'}
                value={values.Message}
                error={formError.input.Message}
                label={'Message'}
                onChange={async (name, value) => {
                    inspectMessage(value);
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