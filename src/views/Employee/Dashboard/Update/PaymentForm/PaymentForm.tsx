import { useState } from "react";
import CostLine from "./PaymentLine";
import CostInput from "./PaymentInput";
import {Text} from "@/components/Input/Export";
import { DB_Payment } from "@/lib/Database/Types";
import { Parts } from "@/process/Employee/Update/Form";

interface CostFormProps {
    form: {
        Cost: number;
        Payments: {[paymentID: string]: DB_Payment};
    };
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function CostForm(props: CostFormProps) {
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
                        <CostLine
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
                <CostInput
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