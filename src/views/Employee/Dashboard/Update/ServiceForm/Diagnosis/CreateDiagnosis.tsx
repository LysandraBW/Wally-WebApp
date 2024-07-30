import { useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";

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
    
    return (
        <div>
            <Text
                name={'Code'}
                value={values.Code}
                label={'Code'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'Message'}
                value={values.Message}
                label={'Message'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <button 
                onClick={() => {
                    props.onChange('Diagnoses', values);
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}