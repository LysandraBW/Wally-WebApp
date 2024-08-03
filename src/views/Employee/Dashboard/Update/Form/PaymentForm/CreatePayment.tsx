import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/validation/Validation";
import { UpdatePayment } from "@/process/Employee/Update/Form/Form/Payment/Payment";

interface CreatePaymentProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: UpdatePayment = {
    AppointmentID:  '',
    PaymentID:      0,
    Payment:        '',
    Name:           '',
    Type:           '',
    CCN:            '',
    EXP:            '',
    PaymentDate:    new Date(),
}

export default function CreatePayment(props: CreatePaymentProps) {
    const [values, setValues] = useState(defaultInput);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectAll = async () => {
        const validCCN = await inspectInput('CCN', values.CCN, hasValue);
        const validEXP = await inspectInput('EXP', values.EXP, hasValue);
        const validName = await inspectInput('Name', values.Name, hasValue);
        const validType = await inspectInput('Type', values.Type, hasValue);
        const validPayment = await inspectInput('Payment', values.Payment, hasValue);
        return validType && validCCN && validPayment && validName && validEXP;
    }

    return (
        <div>
            <Text
                name={'Payment'}
                value={values.Payment}
                error={formState.input.Payment}
                label={'Payment'}
                onChange={async (name, value) => {
                    inspectInput('Payment', value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Name'}
                value={values.Name}
                error={formState.input.Name}
                label={'Name'}
                onChange={async (name, value) => {
                    inspectInput('Name', value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Type'}
                value={values.Type}
                error={formState.input.Type}
                label={'Type'}
                onChange={async (name, value) => {
                    inspectInput('Type', value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'CCN'}
                value={values.CCN}
                error={formState.input.CCN}
                label={'Credit Card Number'}
                onChange={async (name, value) => {
                    inspectInput('CCN', value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'EXP'}
                value={values.EXP}
                error={formState.input.EXP}
                label={'Expiration Date'}
                onChange={async (name, value) => {
                    inspectInput('EXP', value, hasValue);
                    setValues({...values, [`${name}`]: value});
                }}
            />            
            <button 
                onClick={async () => {
                    if (!(await inspectAll()))
                        return;
                    props.onChange('Payments', {...values, PaymentDate: new Date()});
                    setValues(defaultInput);
                }}
            >
                Add
            </button>
        </div>
    )
}