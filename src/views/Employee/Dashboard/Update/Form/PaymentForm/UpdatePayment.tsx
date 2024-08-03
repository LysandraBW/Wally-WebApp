import { Multiple, Text } from "@/components/Input/Export";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { useEffect, useReducer, useState } from "react";
import { UpdatePayment as UpdatePaymentDate } from "@/submission/Employee/Update/Payment/Form";
import { hasLength } from "@/validation/Validation";
import { toWebDateTime } from "@/lib/Convert/Convert";
import PaymentCard from "./PaymentCard";

interface UpdatePaymentProps {
    payment: UpdatePaymentDate
    onDelete: () => any;
    onUpdate: (payment: UpdatePaymentDate) => any;   
    updateFormState: (state: boolean) => void; 
}

export default function UpdatePayment(props: UpdatePaymentProps) {
    const initialValues = {...props.payment};
    const [values, setValues] = useState(props.payment);
    const [edit, setEdit] = useState(false);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);
    
    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            states: {
                [`${inputName}`]: [errState, errMessage]
            }
        });
        return errState;
    }

    return (
        <>
            {edit &&
                <Multiple
                    onBlur={() => {
                        setEdit(false);
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <Text
                                name='Payment'
                                label='Payment'
                                value={values.Payment} 
                                state={formState.input.Payment}
                                onChange={(name, value) => {
                                    setValues({...values, Payment: value});
                                    inspectInput('Payment', value, hasLength);
                                }}
                                onBlur={() => {
                                    if (values.Payment)
                                        return;
                                    setValues({...values, Payment: initialValues.Payment});
                                    inspectInput('Payment', initialValues.Payment, hasLength);
                                }}
                            />
                            <Text
                                name={'Name'}
                                label={'Name'}
                                value={values.Name}
                                state={formState.input.Name}
                                onChange={async (name, value) => {
                                    inspectInput('Name', value, hasLength);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.Name)
                                        return;
                                    setValues({...values, Name: initialValues.Name});
                                    inspectInput('Name', initialValues.Name, hasLength);
                                }}
                            />
                            <Text
                                name={'Type'}
                                label={'Type'}
                                value={values.Type}
                                state={formState.input.Type}
                                onChange={async (name, value) => {
                                    inspectInput('Type', value, hasLength);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.Type)
                                        return;
                                    setValues({...values, Type: initialValues.Type});
                                    inspectInput('Type',  initialValues.Type, hasLength);
                                }}
                            />
                            <Text
                                name={'CCN'}
                                label={'Credit Card Number'}
                                value={values.CCN}
                                state={formState.input.CCN}
                                onChange={async (name, value) => {
                                    inspectInput('CCN', value, hasLength);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.CCN)
                                        return;
                                    setValues({...values, CCN: initialValues.CCN});
                                    inspectInput('Type', initialValues.CCN, hasLength);
                                }}
                            />
                            <Text
                                name={'EXP'}
                                label={'Expiration Date'}
                                value={values.EXP}
                                state={formState.input.EXP}
                                onChange={async (name, value) => {
                                    inspectInput('EXP', value, hasLength);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.EXP)
                                        return;
                                    setValues({...values, EXP: initialValues.EXP});
                                    inspectInput('EXP', initialValues.EXP, hasLength);
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <PaymentCard
                    payment={values.Payment}
                    ccn={values.CCN}
                    exp={values.EXP}
                    type={values.Type}
                    name={values.Name}
                    paymentDate={toWebDateTime(values.PaymentDate)}
                    onEdit={() => setEdit(values.PaymentID === -1)}
                    onDelete={props.onDelete}
                />
            }
        </>
    )
}