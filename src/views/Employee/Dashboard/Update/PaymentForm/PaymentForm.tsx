import { Checkbox } from "@/components/Input/Export";
import { Services } from "@/lib/Database/Export";
import { Payment, Parts } from "@/lib/Form/Employee/Update/Form"
import { useEffect, useRef, useState } from "react";
import PaymentLine from "./PaymentLine";
import PaymentInput from "./PaymentInput";
import {Text} from "@/components/Input/Export";


interface PaymentFormProps {
    form: {
        Cost: string;
        Payments: {[paymentID: string]: Payment};
    };
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function PaymentForm(props: PaymentFormProps) {
    const [counter, setCounter] = useState<number>(1);

    return (
        <>
            <Text
                name={"Cost"}
                value={props.form.Cost}
                label={"Cost"}
                onChange={(name, value) => props.changeHandler('Cost', name, value)}
            />
            <div>
                Current Parts
                {Object.entries(props.form.Payments).map(([paymentID, payment], i) => (
                    <div key={i}>
                        <PaymentLine
                            payment={payment}
                            onDelete={() => {
                                let modValue = props.form.Payments;
                                delete modValue[`${paymentID}`];
                                props.changeHandler('Cost', 'Payments', modValue);
                            }}
                            onUpdate={(part) => {
                                let modValue = props.form.Payments;
                                props.form.Payments[`${paymentID}`] = part;
                                props.changeHandler('Cost', 'Payments', modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Part Here
                <PaymentInput
                    onChange={(name, value) => {
                        console.log('Stored Payments', props.form.Payments);
                        props.changeHandler('Cost', 'Payments', {...props.form.Payments, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </>
    )
}