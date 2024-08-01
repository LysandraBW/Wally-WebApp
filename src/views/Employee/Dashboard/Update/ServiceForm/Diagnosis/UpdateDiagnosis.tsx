import { Multiple, Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
import { useEffect, useReducer, useState } from "react";

interface UpdateDiagnosisProps {
    diagnosis: DB_Diagnosis
    onDelete: () => any;
    onUpdate: (diagnosis: DB_Diagnosis) => any;   
    updateFormError: (state: boolean) => void;
}

export default function UpdateDiagnosis(props: UpdateDiagnosisProps) {
    const initialData = {...props.diagnosis};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.diagnosis);
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);

    const inspectCode = async (code: string): Promise<boolean> => {
        const [codeState, codeMessage] = await hasValue().inspect(code);
        formErrorDispatch({
            name: 'Code',
            inspection: [codeState, codeMessage]
        });
        return codeState;
    }

    const inspectMessage = async (message: string): Promise<boolean> => {
        const [messageState, messageMessage] = await hasValue().inspect(message);
        formErrorDispatch({
            name: 'Message',
            inspection: [messageState, messageMessage]
        });
        return messageState;
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
                            <div>
                                <input 
                                    value={values.Code} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Code: value});
                                        inspectCode(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Code)
                                            return;
                                        setValues({...values, Code: initialData.Code});
                                        inspectCode(initialData.Code);
                                    }}
                                />
                                {formError.input.Code && !formError.input.Code.state &&
                                    <span>{formError.input.Code.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Message} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Message: value});
                                        inspectMessage(value);
                                    }}
                                    onBlur={() => {
                                        if (values.Message)
                                            return;

                                        setValues({...values, Message: initialData.Message});
                                        inspectMessage(initialData.Message);
                                    }}
                                />
                                {formError.input.Message && !formError.input.Message.state &&
                                    <span>{formError.input.Message.message}</span>
                                }
                            </div>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span 
                        onClick={() => setEdit(true)}
                    >
                        {values.Code} - {values.Message}
                    </span>
                    <span 
                        onClick={() => props.onDelete()}
                    >
                            DELETE
                    </span>
                </div>
            }
        </>
    )
}