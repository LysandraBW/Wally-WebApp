import { Multiple } from "@/components/Input/Export";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useEffect, useReducer, useState } from "react";
import { UpdatePayment as UpdatePaymentDate } from "@/process/Employee/Update/Form/Form/Payment/Payment";
import { hasValue } from "@/validation/Validation";

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
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    return (
        <>
            {/* User can only edit new payments. */}
            {edit &&
                <Multiple
                    onBlur={() => {
                        setEdit(false);
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <div>
                                <input 
                                    value={values.Payment} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, Payment: value});
                                        inspectInput('Payment', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Payment)
                                            return;
                                        setValues({...values, Payment: initialValues.Payment});
                                        inspectInput('Payment', initialValues.Payment, hasValue);
                                    }}
                                />
                                {formState.input.Payment && !formState.input.Payment.state &&
                                    <span>{formState.input.Payment.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Name} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, Name: value});
                                        inspectInput('Name', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Name)
                                            return;
                                        setValues({...values, Name: initialValues.Name});
                                        inspectInput('Name', initialValues.Name, hasValue);
                                    }}
                                />
                                {formState.input.Name && !formState.input.Name.state &&
                                    <span>{formState.input.Name.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Type} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, Type: value});
                                        inspectInput('Type', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Type)
                                            return;
                                        setValues({...values, Type: initialValues.Type});
                                        inspectInput('Type',  initialValues.Type, hasValue);
                                    }}
                                />
                                {formState.input.Type && !formState.input.Type.state &&
                                    <span>{formState.input.Type.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.CCN} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, CCN: value});
                                        inspectInput('CCN', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.CCN)
                                            return;
                                        setValues({...values, CCN: initialValues.CCN});
                                        inspectInput('Type', initialValues.CCN, hasValue);
                                    }}
                                />
                                {formState.input.CCN && !formState.input.CCN.state &&
                                    <span>{formState.input.CCN.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.EXP} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, EXP: value});
                                        inspectInput('EXP', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.EXP)
                                            return;
                                        setValues({...values, EXP: initialValues.EXP});
                                        inspectInput('EXP', initialValues.EXP, hasValue);
                                    }}
                                />
                                {formState.input.EXP && !formState.input.EXP.state &&
                                    <span>{formState.input.EXP.message}</span>
                                }
                            </div>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(!values.PaymentID)}>
                        <div>{props.payment.Payment} {props.payment.PaymentDate.toString()}</div>
                        <div>{props.payment.Type} {props.payment.Name} {props.payment.CCN} {props.payment.EXP}</div>
                    </span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}