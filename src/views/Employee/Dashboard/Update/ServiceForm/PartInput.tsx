import { useState } from "react";
import { Text } from "@/components/Input/Export";

interface PartInputProps {
    onChange: (name: string, value: any) => any;
}

export default function PartInput(props: PartInputProps) {
    const [values, setValues] = useState<{
        PartNumber: string;
        PartName: string;
        Quantity: number;
        UnitCost: number;
    }>({
        PartNumber: '',
        PartName: '',
        Quantity: 0,
        UnitCost: 0
    });
    
    return (
        <div>
            <Text
                name={'Parts'}
                value={values.PartNumber}
                label={'Part Number'}
                onChange={(name, value) => {
                    setValues({...values, 'PartNumber': value});
                }}
            />
            <Text
                name={'Parts'}
                value={values.PartName}
                label={'Part Name'}
                onChange={(name, value) => {
                    setValues({...values, 'PartName': value});
                }}
            />
            <Text
                type='number'
                name={'Parts'}
                value={values.UnitCost}
                label={'Unit Cost'}
                onChange={(name, value) => {
                    setValues({...values, 'UnitCost': value});
                }}
            />
            <Text
                type='number'
                name={'Parts'}
                value={values.Quantity}
                label={'Quantity'}
                onChange={(name, value) => {
                    setValues({...values, 'Quantity': value});
                }}
            />
            <button
                onClick={() => {
                    props.onChange('Parts', values);
                }}
            >
                Add
            </button>
        </div>
    )
}