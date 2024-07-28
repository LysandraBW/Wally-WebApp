import { useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Part } from "@/lib/Database/Types";

interface PartInputProps {
    onChange: (name: string, value: any) => any;
}

const blankInput: DB_Part = {
    PartID: 0,
    PartNumber: '',
    PartName: '',
    Quantity: 0,
    UnitCost: 0
}

export default function PartInput(props: PartInputProps) {
    const [values, setValues] = useState<DB_Part>(blankInput);
    
    return (
        <div>
            <Text
                name={'PartNumber'}
                value={values.PartNumber}
                label={'Part Number'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'PartName'}
                value={values.PartName}
                label={'Part Name'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                type='number'
                name={'UnitCost'}
                value={values.UnitCost}
                label={'Unit Cost'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                type='number'
                name={'Quantity'}
                value={values.Quantity}
                label={'Quantity'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <button 
                onClick={() => {
                    props.onChange('Parts', values);
                    setValues(blankInput);
                }}
            >
                Add
            </button>
        </div>
    )
}