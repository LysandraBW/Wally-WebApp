import { Text } from "@/components/Input/Export";
import { useState } from "react";

interface DiagnosisLineProps {
    diagnosis: {
        Code: string;
        Message: string;
    }
    onDelete: () => any;
    onUpdate: (diagnosis: {Code: string, Message: string}) => any;   
}

export default function DiagnosisLine(props: DiagnosisLineProps) {
    const initialCode = props.diagnosis.Code;
    const initialMessage = props.diagnosis.Message;
    
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.diagnosis);

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
                        value={values.Code} 
                        onChange={(event) => setValues({...values, Code: event.target.value})}
                        onBlur={() => {
                            if (!values.Code) {
                                setValues({...values, Code: initialCode});
                            }
                        }}
                    />
                    <input 
                        value={values.Message} 
                        onChange={(event) => setValues({...values, Message: event.target.value})}
                        onBlur={() => {
                            if (!values.Message) {
                                setValues({...values, Message: initialMessage});
                            }
                        }}
                    />
                </div>
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