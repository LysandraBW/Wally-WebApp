import { Multiple, Text } from "@/components/Input/Export";
import { DB_Diagnosis } from "@/database/Types";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { contains } from "@/validation/Validation";
import { useEffect, useReducer, useState } from "react";
import DiagnosisCard from "../../../Card/DiagnosisCard";

interface UpdateDiagnosisProps {
    diagnosis: DB_Diagnosis
    onDelete: () => any;
    onUpdate: (diagnosis: DB_Diagnosis) => any;   
    updateFormState: (state: boolean) => void;
}

export default function UpdateDiagnosis(props: UpdateDiagnosisProps) {
    const initialValues = {...props.diagnosis};
    const [values, setValues] = useState(props.diagnosis);
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
            {edit && 
                <Multiple
                    onBlur={() => {
                        setEdit(false);
                        props.onUpdate(values);
                    }}
                    children={(
                        <div>
                            <Text
                                name={'Code'}
                                label={'Code'}
                                value={values.Code}
                                state={formState.input.Code}
                                onChange={async (name, value) => {
                                    inspectInput(name, value, contains);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.Code)
                                        return;
                                    setValues({...values, Code: initialValues.Code});
                                    inspectInput('Code', initialValues.Code, contains);
                                }}
                            />
                            <Text
                                name={'Message'}
                                label={'Message'}
                                value={values.Message}
                                state={formState.input.Message}
                                onChange={async (name, value) => {
                                    inspectInput(name, value, contains);
                                    setValues({...values, [`${name}`]: value});
                                }}
                                onBlur={() => {
                                    if (values.Code)
                                        return;
                                    setValues({...values, Code: initialValues.Code});
                                    inspectInput('Code', initialValues.Code, contains);
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <DiagnosisCard
                    code={values.Code}
                    message={values.Message}
                    onEdit={() => setEdit(true)}
                    onDelete={() => props.onDelete()}
                />
            }
        </>
    )
}