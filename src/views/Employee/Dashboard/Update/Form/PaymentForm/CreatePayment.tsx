import { useReducer, useState } from "react";
import { Text } from "@/components/Input/Export";
import { DB_Payment } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

interface CreatePaymentProps {
    onChange: (name: string, value: any) => any;
}

const defaultInput: DB_Payment = {
    AppointmentID:  '',
    PaymentID:      0,
    Payment:        0,
    Name:           '',
    Type:           '',
    CCN:            '',
    EXP:            '',
    PaymentDate:    new Date(),
}

export default function CreatePayment(props: CreatePaymentProps) {
    const [values, setValues] = useState<DB_Payment>(defaultInput);
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    const inspectPayment = async (payment: number = values.Payment): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(payment);
        formErrorDispatch({
            name: 'Payment',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectName = async (name: string = values.Name): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(name);
        formErrorDispatch({
            name: 'Name',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectType = async (type: string = values.Type): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(type);
        formErrorDispatch({
            name: 'Type',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectCCN = async (ccn: string = values.Type): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(ccn);
        formErrorDispatch({
            name: 'CCN',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectEXP = async (exp: string = values.EXP): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(exp);
        formErrorDispatch({
            name: 'EXP',
            state: [errState, errMessage]
        });
        return errState;
    }

    const inspectAll = async () => {
        const ccn = await inspectCCN();
        const exp = await inspectEXP();
        const name = await inspectName();
        const type = await inspectType();
        const payment = await inspectPayment();
        return name && type && ccn && exp && payment;
    }

    return (
        <div>
            <Text
                name={'Payment'}
                value={values.Payment}
                error={formError.input.Payment}
                label={'Payment'}
                onChange={async (name, value) => {
                    inspectPayment(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Name'}
                value={values.Name}
                error={formError.input.Name}
                label={'Name'}
                onChange={async (name, value) => {
                    inspectName(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'Type'}
                value={values.Type}
                error={formError.input.Type}
                label={'Type'}
                onChange={async (name, value) => {
                    inspectType(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'CCN'}
                value={values.CCN}
                error={formError.input.CCN}
                label={'Credit Card Number'}
                onChange={async (name, value) => {
                    inspectCCN(value);
                    setValues({...values, [`${name}`]: value});
                }}
            />
            <Text
                name={'EXP'}
                value={values.EXP}
                error={formError.input.EXP}
                label={'Expiration Date'}
                onChange={async (name, value) => {
                    inspectEXP(value);
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