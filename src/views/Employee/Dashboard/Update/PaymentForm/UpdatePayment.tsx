import { Multiple } from "@/components/Input/Export";
import { DB_Payment } from "@/database/Types";
import { toInteger } from "@/lib/Convert/Convert";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
import { useEffect, useReducer, useState } from "react";

interface UpdatePaymentProps {
    payment: DB_Payment
    onDelete: () => any;
    onUpdate: (payment: DB_Payment) => any;   
    updateFormError: (state: boolean) => void; 
}

export default function UpdatePayment(props: UpdatePaymentProps) {
    const initialPaymentData = {...props.payment};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.payment);
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);
    
    const inspectPayment = async (payment: string = values.Payment.toString()): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(payment);
        formErrorDispatch({
            name: 'Payment',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectName = async (name: string = values.Name): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(name);
        formErrorDispatch({
            name: 'Name',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectType = async (type: string = values.Type): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(type);
        formErrorDispatch({
            name: 'Type',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectCCN = async (ccn: string = values.Type): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(ccn);
        formErrorDispatch({
            name: 'CCN',
            inspection: [errState, errMessage]
        });
        return errState;
    }

    const inspectEXP = async (exp: string = values.EXP): Promise<boolean> => {
        const [errState, errMessage] = await hasValue().inspect(exp);
        formErrorDispatch({
            name: 'EXP',
            inspection: [errState, errMessage]
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
                                        setValues({...values, Payment: toInteger(value)});
                                        inspectPayment(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Payment)
                                            return;

                                        setValues({...values, Payment: initialPaymentData.Payment});
                                        inspectPayment(initialPaymentData.Payment.toString());
                                    }}
                                />
                                {formError.input.Payment && !formError.input.Payment.state &&
                                    <span>{formError.input.Payment.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Name} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, Name: value});
                                        inspectName(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Name)
                                            return;
                                        
                                        setValues({...values, Name: initialPaymentData.Name});
                                        inspectName(initialPaymentData.Name);
                                    }}
                                />
                                {formError.input.Name && !formError.input.Name.state &&
                                    <span>{formError.input.Name.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Type} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, Type: value});
                                        inspectType(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Type)
                                            return;

                                        setValues({...values, Type: initialPaymentData.Type});
                                        inspectType(initialPaymentData.Type);
                                    }}
                                />
                                {formError.input.Type && !formError.input.Type.state &&
                                    <span>{formError.input.Type.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.CCN} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, CCN: value});
                                        inspectCCN(value);
                                    }}
                                    onBlur={() => {
                                        if (values.CCN)
                                            return;
                                        
                                        setValues({...values, CCN: initialPaymentData.CCN});
                                        inspectCCN(initialPaymentData.CCN);
                                    }}
                                />
                                {formError.input.CCN && !formError.input.CCN.state &&
                                    <span>{formError.input.CCN.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.EXP} 
                                    onChange={async (event) => {
                                        const value = event.target.value
                                        setValues({...values, EXP: value});
                                        inspectEXP(value);
                                    }}
                                    onBlur={() => {
                                        if (values.EXP)
                                            return;

                                        setValues({...values, EXP: initialPaymentData.EXP});
                                        inspectEXP(initialPaymentData.EXP);
                                    }}
                                />
                                {formError.input.EXP && !formError.input.EXP.state &&
                                    <span>{formError.input.EXP.message}</span>
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