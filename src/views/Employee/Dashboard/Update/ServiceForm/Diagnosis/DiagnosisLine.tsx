import { Multiple, Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/lib/Database/Types";
import { useState } from "react";

interface DiagnosisLineProps {
    diagnosis: DB_Diagnosis
    onDelete: () => any;
    onUpdate: (diagnosis: DB_Diagnosis) => any;   
}

export default function DiagnosisLine(props: DiagnosisLineProps) {
    const initialCode = props.diagnosis.Code;
    const initialMessage = props.diagnosis.Message;
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.diagnosis);

    return (
        <>
            {edit && 
                <Multiple
                    onBlur={() => {
                        setEdit(false)
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <input 
                                value={values.Code} 
                                onChange={(event) => setValues({...values, Code: event.target.value})}
                                onBlur={() => !values.Code && setValues({...values, Code: initialCode})}
                            />
                            <input 
                                value={values.Message} 
                                onChange={(event) => setValues({...values, Message: event.target.value})}
                                onBlur={() => !values.Message && setValues({...values, Message: initialMessage})}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>{props.diagnosis.Code} - {props.diagnosis.Message}</span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}