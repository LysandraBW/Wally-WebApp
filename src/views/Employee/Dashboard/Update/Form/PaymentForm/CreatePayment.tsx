import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { contains } from "@/validation/Validation";
import { UpdatePayment } from "@/submission/Employee/Update/Payment/Form";
import AddButton from "@/components/Button/Text/Add";

interface CreatePaymentProps {
    onChange: (name: string, value: any) => any;
}

const defaultValues: UpdatePayment = {
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
    const [values, setValues] = useState(defaultValues);
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
        const validCCN = await inspectInput('CCN', values.CCN, contains);
        const validEXP = await inspectInput('EXP', values.EXP, contains);
        const validName = await inspectInput('Name', values.Name, contains);
        const validType = await inspectInput('Type', values.Type, contains);
        const validPayment = await inspectInput('Payment', values.Payment, contains);
        return validType && validCCN && validPayment && validName && validEXP;
    }

    return (
        <div>
            <Text
                name={'Payment'}
                label={'Payment'}
                value={values.Payment}
                state={formState.input.Payment}
                onChange={async (name, value) => {
                    inspectInput('Payment', value, contains);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Name'}
                label={'Name'}
                value={values.Name}
                state={formState.input.Name}
                onChange={async (name, value) => {
                    inspectInput('Name', value, contains);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Type'}
                label={'Type'}
                value={values.Type}
                state={formState.input.Type}
                onChange={async (name, value) => {
                    inspectInput('Type', value, contains);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'CCN'}
                label={'Credit Card Number'}
                value={values.CCN}
                state={formState.input.CCN}
                onChange={async (name, value) => {
                    inspectInput('CCN', value, contains);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'EXP'}
                label={'Expiration Date'}
                value={values.EXP}
                state={formState.input.EXP}
                onChange={async (name, value) => {
                    inspectInput('EXP', value, contains);
                    setValues({...values, [`${name}`]: value});
                }}
            />            
            <AddButton 
                onClick={async () => {
                    if (!(await inspectAll()))
                        return;
                    props.onChange('Payments', {...values, PaymentDate: new Date()});
                    setValues(defaultValues);
                }}
            />
        </div>
    )
}