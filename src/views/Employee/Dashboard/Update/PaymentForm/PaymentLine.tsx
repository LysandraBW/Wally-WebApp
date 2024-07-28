import { Multiple } from "@/components/Input/Export";
import { DB_Payment } from "@/lib/Database/Types";
import { useState } from "react";

interface CostLineProps {
    payment: DB_Payment
    onDelete: () => any;
    onUpdate: (payment: DB_Payment) => any;   
}

export default function CostLine(props: CostLineProps) {
    const ref = {...props.payment};
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
                                onChange={(event) => setValues({...values, Payment: event.target.value})}
                                onBlur={() => !values.Payment && setValues({...values, Payment: ref.Payment})}
                            />
                            <input 
                                value={values.Name} 
                                onChange={(event) => setValues({...values, Name: event.target.value})}
                                onBlur={() => !values.Name && setValues({...values, Name: ref.Name})}
                            />
                            <input 
                                value={values.Type} 
                                onChange={(event) => setValues({...values, Type: event.target.value})}
                                onBlur={() => !values.Type && setValues({...values, Type: ref.Type})}
                            />
                            <input 
                                value={values.CCN} 
                                onChange={(event) => setValues({...values, CCN: event.target.value})}
                                onBlur={() => !values.CCN && setValues({...values, CCN: ref.CCN})}
                            />
                            <input 
                                value={values.EXP} 
                                onChange={(event) => setValues({...values, EXP: event.target.value})}
                                onBlur={() => !values.EXP && setValues({...values, EXP: ref.EXP})}
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