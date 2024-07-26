import { Text } from "@/components/Input/Export";
import { useState } from "react";

interface PaymentLineProps {
    payment: {
        Payment: string;
        PaymentDate: string;
        Name: string; Type: string; CCN: string; EXP: string;
    }
    onDelete: () => any;
    onUpdate: (payment: {Payment: string;
        PaymentDate: string;
        Name: string; Type: string; CCN: string; EXP: string;}) => any;   
}

export default function PaymentLine(props: PaymentLineProps) {
    const initialPayment = props.payment.Payment;
    const initialPaymentDate = props.payment.PaymentDate;
    const initialName = props.payment.Name;
    const initialType = props.payment.Type;
    const initialCCN = props.payment.CCN;
    const initialEXP = props.payment.EXP;
    
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.payment);

    return (
        <>
            {edit && 
                <div
                    tabIndex={0}
                    onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                            return;
                        setEdit(false)
                        props.onUpdate(values);
                    }}
                >
                    <input 
                        value={values.Payment} 
                        onChange={(event) => setValues({...values, Payment: event.target.value})}
                        onBlur={() => {
                            if (!values.Payment) {
                                setValues({...values, Payment: initialPayment});
                            }
                        }}
                    />
                    <input 
                        value={values.Name} 
                        onChange={(event) => setValues({...values, Name: event.target.value})}
                        onBlur={() => {
                            if (!values.Name) {
                                setValues({...values, Name: initialName});
                            }
                        }}
                    />
                    <input 
                        value={values.Type} 
                        onChange={(event) => setValues({...values, Type: event.target.value})}
                        onBlur={() => {
                            if (!values.Type) {
                                setValues({...values, Type: initialType});
                            }
                        }}
                    />
                    <input 
                        value={values.CCN} 
                        onChange={(event) => setValues({...values, CCN: event.target.value})}
                        onBlur={() => {
                            if (!values.CCN) {
                                setValues({...values, CCN: initialCCN});
                            }
                        }}
                    />
                    <input 
                        value={values.EXP} 
                        onChange={(event) => setValues({...values, EXP: event.target.value})}
                        onBlur={() => {
                            if (!values.EXP) {
                                setValues({...values, EXP: initialPaymentDate});
                            }
                        }}
                    />
                </div>
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>
                        <div>{props.payment.Payment} {props.payment.PaymentDate.toString()}</div>
                        <div>{props.payment.Type} {props.payment.Name} {props.payment.CCN} {props.payment.EXP}</div>
                    </span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}