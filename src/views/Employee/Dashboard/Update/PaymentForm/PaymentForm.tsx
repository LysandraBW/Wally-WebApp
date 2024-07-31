import { useState } from "react";
import UpdatePayment from "./UpdatePayment";
import CreatePayment from "./CreatePayment";
import {Text} from "@/components/Input/Export";
import { DB_Payment } from "@/database/Types";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";

interface PaymentFormProps {
    form: {
        Cost: number;
        Payments: {[paymentID: string]: DB_Payment};
    };
    changeHandler: (formPart: FormPart, name: string, value: any) => void;
}

export default function PaymentForm(props: PaymentFormProps) {
    const [counter, setCounter] = useState<number>(1);

    return (
        <>
            <Text
                name={"Cost"}
                value={props.form.Cost}
                label={"Cost"}
                onChange={(name, value) => props.changeHandler('Payment', name, value)}
            />
            <div>
                Current Payments
                {Object.entries(props.form.Payments).map(([paymentID, payment], i) => (
                    <div key={i}>
                        <UpdatePayment
                            payment={payment}
                            onDelete={() => {
                                let updatedValue = {...props.form.Payments};
                                delete updatedValue[`${paymentID}`];
                                props.changeHandler('Payment', 'Payments', updatedValue);
                            }}
                            onUpdate={(part) => {
                                let updatedValue = {...props.form.Payments};
                                props.form.Payments[`${paymentID}`] = part;
                                props.changeHandler('Payment', 'Payments', updatedValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Payment Here
                <CreatePayment
                    onChange={(name, value) => {
                        props.changeHandler('Payment', 'Payments', {...props.form.Payments, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </>
    )
}