import { useEffect, useReducer, useState } from "react";
import UpdatePayment from "./UpdatePayment";
import CreatePayment from "./CreatePayment";
import {Text} from "@/components/Input/Export";
import { DB_Payment } from "@/database/Types";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

interface PaymentFormProps {
    form: {
        Cost: number;
        Payments: {[paymentID: string]: DB_Payment};
    };
    updateFormError: (state: boolean) => void;
    changeHandler: (formPart: FormPart, name: string, value: any) => void;
}

export default function PaymentForm(props: PaymentFormProps) {
    const initialCost = props.form.Cost;
    const [costError, costErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);
    const [counter, setCounter] = useState<number>(1);

    useEffect(() => {
        // This is called by the Cost input.
        props.updateFormError(costError.state);
    }, [costError.state]);

    const inspectCost = async (cost: string): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(cost);
        costErrorDispatch({
            name: 'Cost',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    return (
        <>
            <Text
                name={"Cost"}
                value={props.form.Cost}
                error={costError.input.Cost}
                label={"Cost"}
                onChange={(name, value) => {
                    props.changeHandler('Payment', name, value);
                    inspectCost(value);
                }}
                onBlur={() => {
                    if (props.form.Cost)
                        return;

                    props.changeHandler('Payment', 'Cost', initialCost);
                    inspectCost(initialCost.toString());
                }}
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
                                updatedValue[`${paymentID}`] = part;
                                props.changeHandler('Payment', 'Payments', updatedValue);
                            }}
                            updateFormError={(state: boolean) => {
                                costErrorDispatch({
                                    name: 'Other',
                                    inspection: [state, '']
                                });
                                props.updateFormError(state);
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