import { useState } from "react";
import { Text } from "@/components/Input/Export";

interface PaymentInputProps {
    onChange: (name: string, value: any) => any;
}

export default function PaymentInput(props: PaymentInputProps) {
    const [values, setValues] = useState<{
        Payment: string;
        PaymentDate: string;
        Name: string; Type: string; CCN: string; EXP: string;
    }>({
        Payment: '',
        PaymentDate: new Date().toString(),
        Name: '', 
        Type: '', 
        CCN: '', 
        EXP: '',
    });

    return (
        <div>
            <Text
                name={'Payments'}
                value={values.Payment}
                label={'Payment'}
                onChange={(name, value) => {
                    setValues({...values, 'Payment': value});
                }}
            />
            <Text
                name={'Payments'}
                value={values.Name}
                label={'Name'}
                onChange={(name, value) => {
                    setValues({...values, 'Name': value});
                }}
            />
            <Text
                name={'Payments'}
                value={values.Type}
                label={'Type'}
                onChange={(name, value) => {
                    setValues({...values, 'Type': value});
                }}
            />
            <Text
                name={'Payments'}
                value={values.CCN}
                label={'CCN'}
                onChange={(name, value) => {
                    setValues({...values, 'CCN': value});
                }}
            />
            <Text
                name={'Payments'}
                value={values.EXP}
                label={'EXP'}
                onChange={(name, value) => {
                    setValues({...values, 'EXP': value});
                }}
            />            
            <button
                onClick={() => {
                    props.onChange('Payments', {...values, PaymentDate: new Date().toString()});
                }}
            >
                Add
            </button>
        </div>
    )
}