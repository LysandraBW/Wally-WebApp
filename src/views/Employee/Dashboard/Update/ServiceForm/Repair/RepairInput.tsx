import { useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Repair } from "@/lib/Database/Types";

interface RepairInputProps {
    onChange: (name: string, value: any) => any;
}

const blankInput: DB_Repair = {
    RepairID: 0,
    Repair: ''
}

export default function RepairInput(props: RepairInputProps) {
    const [values, setValues] = useState<DB_Repair>(blankInput);
    
    return (
        <div>
            <Text
                name={'Repair'}
                value={values.Repair}
                label={'Repair'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <button 
                onClick={() => {
                    props.onChange('Repairs', values);
                    setValues(blankInput);
                }}
            >
                Add
            </button>
        </div>
    )
}