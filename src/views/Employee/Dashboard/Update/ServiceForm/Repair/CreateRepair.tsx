import { useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Repair } from "@/database/Types";

interface CreateRepairProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_Repair = {
    RepairID:   0,
    Repair:     ''
}

export default function CreateRepair(props: CreateRepairProps) {
    const [values, setValues] = useState<DB_Repair>(defaultInput);
    
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
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}