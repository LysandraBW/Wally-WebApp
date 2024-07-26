import { useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Payment } from "@/lib/Database/Types";

interface PaymentInputProps {
    onChange: (name: string, value: any) => any;
}

export default function PaymentInput(props: PaymentInputProps) {
    const [values, setValues] = useState<DB_Payment>({
        AppointmentID: '',
        PaymentID: 0,
        Payment: '',
        PaymentDate: new Date(),
        Name: '', 
        Type: '', 
        CCN: '', 
        EXP: '',
    });

    return (
        <div>
            <Text
                name={'Payment'}
                value={values.Payment}
                label={'Payment'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'Name'}
                value={values.Name}
                label={'Name'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'Type'}
                value={values.Type}
                label={'Type'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'CCN'}
                value={values.CCN}
                label={'Credit Card Number'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />
            <Text
                name={'EXP'}
                value={values.EXP}
                label={'Expiration Date'}
                onChange={(name, value) => setValues({...values, [`${name}`]: value})}
            />            
            <button onClick={() => props.onChange('Payments', {...values, PaymentDate: new Date()})}>Add</button>
        </div>
    )
}