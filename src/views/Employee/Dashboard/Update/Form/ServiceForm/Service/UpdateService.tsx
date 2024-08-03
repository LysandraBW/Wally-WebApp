import { Multiple } from "@/components/Input/Export";
import { DB_AppointmentService } from "@/database/Types";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { hasValue } from "@/validation/Validation";
import { useEffect, useReducer, useState } from "react";

interface UpdateServiceProps {
    service: DB_AppointmentService
    onDelete: () => any;
    onUpdate: (service: DB_AppointmentService) => any;   
    updateFormState: (state: boolean) => void;
}

export default function UpdateService(props: UpdateServiceProps) {
    const initialValues = {...props.service};
    const [values, setValues] = useState(props.service);
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
                            <div>
                                <input 
                                    value={values.Class} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Class: value});
                                        inspectInput('Class', value, hasValue);
                                    }}
                                    onBlur={async () => {
                                        if (values.Class)
                                            return;
                                        inspectInput('Class', initialValues.Class, hasValue);
                                        setValues({...values, Class: initialValues.Class});
                                    }}
                                />
                                {formState.input.Class && !formState.input.Class.state && 
                                    <span>{formState.input.Class.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Division} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Division: value});
                                        inspectInput('Division', initialValues.Division, hasValue);
                                    }}
                                    onBlur={async () => {
                                        if (values.Division)
                                            return;
                                        inspectInput('Division', initialValues.Division, hasValue);
                                        setValues({...values, Division: initialValues.Division});
                                    }}
                                />
                                {formState.input.Division && !formState.input.Division.state && 
                                    <span>{formState.input.Division.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Service} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Service: value});
                                        inspectInput('Service', initialValues.Service, hasValue);
                                    }}
                                    onBlur={async () => {
                                        if (values.Service)
                                            return;
                                        inspectInput('Service', initialValues.Service, hasValue);
                                        setValues({...values, Service: initialValues.Service});
                                    }}
                                />
                                {formState.input.Service && !formState.input.Service.state && 
                                    <span>{formState.input.Service.message}</span>
                                }
                            </div>
                        </div>
                    )}
                />
            }
            {!edit && 
                <div>
                    <span onClick={() => setEdit(true)}>{props.service.Class} - {props.service.Division} - {props.service.Service}</span>
                    <span onClick={() => props.onDelete()}>DELETE</span>
                </div>
            }
        </>
    )
}