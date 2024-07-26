import { useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/lib/Database/Types";

interface DiagnosisInputProps {
    onChange: (name: string, value: any) => any;
}

export default function DiagnosisInput(props: DiagnosisInputProps) {
    const [values, setValues] = useState<DB_Diagnosis>({
        DiagnosisID: 0,
        Code: '',
        Message: '',
    });
    
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
            <button onClick={() => props.onChange('Diagnoses', values)}>Add</button>
        </div>
    )
}