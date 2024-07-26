import { useState } from "react";
import { Text } from "@/components/Input/Export";

interface DiagnosisInputProps {
    onChange: (name: string, value: any) => any;
}

export default function DiagnosisInput(props: DiagnosisInputProps) {
    const [values, setValues] = useState<{
        Code: string;
        Message: string;
    }>({
        Code: '',
        Message: '',
    });
    
    return (
        <div>
            <Text
                name={'Diagnoses'}
                value={values.Code}
                label={'Code'}
                onChange={(name, value) => {
                    setValues({...values, 'Code': value});
                }}
            />
            <Text
                name={'Diagnoses'}
                value={values.Message}
                label={'Message'}
                onChange={(name, value) => {
                    setValues({...values, 'Message': value});
                }}
            />
            <button
                onClick={() => {
                    props.onChange('Diagnoses', values);
                }}
            >
                Add
            </button>
        </div>
    )
}