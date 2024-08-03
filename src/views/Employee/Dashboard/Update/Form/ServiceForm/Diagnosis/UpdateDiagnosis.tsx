import { Multiple } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/validation/Validation";
import { useEffect, useReducer, useState } from "react";

interface UpdateDiagnosisProps {
    diagnosis: DB_Diagnosis
    onDelete: () => any;
    onUpdate: (diagnosis: DB_Diagnosis) => any;   
    updateFormError: (state: boolean) => void;
}

export default function UpdateDiagnosis(props: UpdateDiagnosisProps) {
    const initialValues = {...props.diagnosis};
    const [values, setValues] = useState(props.diagnosis);
    const [edit, setEdit] = useState(false);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormError(formState.state);
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
                                        inspectInput('Code', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Code)
                                            return;
                                        setValues({...values, Code: initialValues.Code});
                                        inspectInput('Code', initialValues.Code, hasValue);
                                    }}
                                />
                                {formState.input.Code && !formState.input.Code.state &&
                                    <span>{formState.input.Code.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Message} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Message: value});
                                        inspectInput('Message', value, hasValue);
                                    }}
                                    onBlur={() => {
                                        if (values.Message)
                                            return;
                                        setValues({...values, Message: initialValues.Message});
                                        inspectInput('Message', initialValues.Message, hasValue);
                                    }}
                                />
                                {formState.input.Message && !formState.input.Message.state &&
                                    <span>{formState.input.Message.message}</span>
                                }
                            </div>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span  onClick={() => setEdit(true)}>
                        {values.Code} - {values.Message}
                    </span>
                    <span onClick={() => props.onDelete()}>
                        DELETE
                    </span>
                </div>
            }
        </>
    )
}