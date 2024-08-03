import { useEffect, useReducer, useState } from "react";
import UpdatePayment from "./UpdatePayment";
import CreatePayment from "./CreatePayment";
import {Text} from "@/components/Input/Export";
import { FormType } from "@/process/Employee/Update/Form/UpdateForm";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { UpdatePayment as UpdatePaymentData } from "@/process/Employee/Update/Form/Form/Payment/Payment";

interface PaymentFormProps {
    form: {
        Cost: string;
        Payments: {[paymentID: string]: UpdatePaymentData};
    };
    updateFormState: (state: boolean) => void;
    changeHandler: (formPart: FormType, name: string, value: any) => void;
}

export default function PaymentForm(props: PaymentFormProps) {
    const initialCost = props.form.Cost;
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const [counter, setCounter] = useState<number>(1);
    
    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectCost = async (cost: string): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(cost);
        formStateDispatch({
            name: 'Cost',
            state: [errState, errMessage]
        });
        return errState;
    }

    return (
        <>
            <Text
                name={"Cost"}
                label={"Cost"}
                value={props.form.Cost}
                error={formState.input.Cost}
                onChange={(name, value) => {
                    props.changeHandler('Payment', name, value);
                    inspectCost(value);
                }}
                onBlur={() => {
                    if (props.form.Cost)
                        return;
                    props.changeHandler('Payment', 'Cost', initialCost);
                    inspectCost(initialCost);
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
                            updateFormState={(state: boolean) => {
                                formStateDispatch({
                                    name: `Payment ${i}`,
                                    state: [state, '']
                                });
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