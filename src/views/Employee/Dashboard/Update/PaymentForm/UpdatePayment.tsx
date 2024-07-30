import { Multiple } from "@/components/Input/Export";
import { DB_Payment } from "@/database/Types";
import { toInteger } from "@/lib/Helper";
import { useState } from "react";

interface UpdatePaymentProps {
    payment: DB_Payment
    onDelete: () => any;
    onUpdate: (payment: DB_Payment) => any;   
}

export default function UpdatePayment(props: UpdatePaymentProps) {
    const initialPaymentData = {...props.payment};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.payment);

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
                            <input 
                                value={values.Payment} 
                                onChange={(event) => setValues({...values, Payment: toInteger(event.target.value)})}
                                onBlur={() => !values.Payment && setValues({...values, Payment: initialPaymentData.Payment})}
                            />
                            <input 
                                value={values.Name} 
                                onChange={(event) => setValues({...values, Name: event.target.value})}
                                onBlur={() => !values.Name && setValues({...values, Name: initialPaymentData.Name})}
                            />
                            <input 
                                value={values.Type} 
                                onChange={(event) => setValues({...values, Type: event.target.value})}
                                onBlur={() => !values.Type && setValues({...values, Type: initialPaymentData.Type})}
                            />
                            <input 
                                value={values.CCN} 
                                onChange={(event) => setValues({...values, CCN: event.target.value})}
                                onBlur={() => !values.CCN && setValues({...values, CCN: initialPaymentData.CCN})}
                            />
                            <input 
                                value={values.EXP} 
                                onChange={(event) => setValues({...values, EXP: event.target.value})}
                                onBlur={() => !values.EXP && setValues({...values, EXP: initialPaymentData.EXP})}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(!!values.PaymentID)}>
                        <div>{props.payment.Payment} {props.payment.PaymentDate.toString()}</div>
                        <div>{props.payment.Type} {props.payment.Name} {props.payment.CCN} {props.payment.EXP}</div>
                    </span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}