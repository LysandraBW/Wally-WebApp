import { useEffect, useReducer, useState } from "react";
import UpdatePayment from "./UpdatePayment";
import CreatePayment from "./CreatePayment";
import {Text} from "@/components/Input/Export";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { UpdatePayment as UpdatePaymentData } from "@/submission/Employee/Update/Payment/Form";
import { hasLength, validNumber } from "@/validation/Validation";
import { FormType } from "@/submission/Employee/Update/Form";

interface PaymentFormProps {
    form: {
        Cost: string;
        Payments: {[paymentID: string]: UpdatePaymentData};
    };
    updateFormState: (state: boolean) => void;
    changeHandler: (part: FormType, name: string, value: any) => void;
}

export default function PaymentForm(props: PaymentFormProps) {
    const initialCost = props.form.Cost;
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const [counter, setCounter] = useState<number>(1);
    
    useEffect(() => {
        inspectCost(props.form.Cost)
    }, []);

    useEffect(() => {
        console.log(formState);
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectCost = async (cost: string): Promise<boolean> => {
        const [errState, errMessage] = await validNumber(cost, true);
        formStateDispatch({
            states: {
                Cost: [errState, errMessage]
            }
        });
        return errState;
    }

    return (
        <>
            <Text
                name={"Cost"}
                label={"Cost"}
                value={props.form.Cost}
                state={formState.input.Cost}
                onChange={(name, value) => {
                    props.changeHandler(FormType.Payment, name, value);
                    inspectCost(value);
                }}
                onBlur={() => {
                    if (props.form.Cost)
                        return;
                    props.changeHandler(FormType.Payment, 'Cost', initialCost);
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
                                props.changeHandler(FormType.Payment, 'Payments', updatedValue);
                            }}
                            onUpdate={(part) => {
                                let updatedValue = {...props.form.Payments};
                                updatedValue[`${paymentID}`] = part;
                                props.changeHandler(FormType.Payment, 'Payments', updatedValue);
                            }}
                            updateFormState={(state: boolean) => {
                                formStateDispatch({
                                    states: {
                                        [`Payment ${i}`]: [state, '']
                                    }
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
                        props.changeHandler(FormType.Payment, 'Payments', {...props.form.Payments, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </>
    )
}