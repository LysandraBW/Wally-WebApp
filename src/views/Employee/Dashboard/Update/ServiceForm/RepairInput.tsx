import { useState } from "react";
import { Text } from "@/components/Input/Export";

interface RepairInputProps {
    onChange: (name: string, value: any) => any;
}

export default function RepairInput(props: RepairInputProps) {
    const [values, setValues] = useState<{
        Repair: string
    }>({
        Repair: ''
    });
    
    return (
        <div>
            <Text
                name={'Repairs'}
                value={values.Repair}
                label={'Repair'}
                onChange={(name, value) => {
                    setValues({...values, 'Repair': value});
                }}
            />
            <button
                onClick={() => {
                    props.onChange('Repairs', values);
                }}
            >
                Add
            </button>
        </div>
    )
}