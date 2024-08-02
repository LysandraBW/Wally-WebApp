import { Multiple } from "@/components/Input/Export";
import { DB_AppointmentService } from "@/database/Types";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { useEffect, useReducer, useState } from "react";

interface UpdateServiceProps {
    service: DB_AppointmentService
    onDelete: () => any;
    onUpdate: (service: DB_AppointmentService) => any;   
    updateFormError: (state: boolean) => void;
}

export default function UpdateService(props: UpdateServiceProps) {
    const initialServiceData = {...props.service};
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(props.service);
    const [formError, formErrorDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);
    
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
                                        formErrorDispatch({
                                            name: 'Class',
                                            state: await hasValue().inspect(value)
                                        });
                                    }}
                                    onBlur={async () => {
                                        if (values.Class)
                                            return;

                                        formErrorDispatch({
                                            name: 'Class',
                                            state: await hasValue().inspect(initialServiceData.Class)
                                        });
                                        setValues({...values, Class: initialServiceData.Class});
                                    }}
                                />
                                {formError.input.Class && !formError.input.Class.state && 
                                    <span>{formError.input.Class.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Division} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Division: value});
                                        formErrorDispatch({
                                            name: 'Division',
                                            state: await hasValue().inspect(value)
                                        });
                                    }}
                                    onBlur={async () => {
                                        if (values.Division)
                                            return;
                                        formErrorDispatch({
                                            name: 'Division',
                                            state: await hasValue().inspect(initialServiceData.Division)
                                        });
                                        setValues({...values, Division: initialServiceData.Division})}}
                                />
                                {formError.input.Division && !formError.input.Division.state && 
                                    <span>{formError.input.Division.message}</span>
                                }
                            </div>
                            <div>
                                <input 
                                    value={values.Service} 
                                    onChange={async (event) => {
                                        const value = event.target.value;
                                        setValues({...values, Service: value});
                                        formErrorDispatch({
                                            name: 'Service',
                                            state: await hasValue().inspect(value)
                                        });
                                    }}
                                    onBlur={async () => {
                                        if (values.Service)
                                            return;
                                        formErrorDispatch({
                                            name: 'Service',
                                            state: await hasValue().inspect(initialServiceData.Service)
                                        });
                                        setValues({...values, Service: initialServiceData.Service});
                                    }}
                                />
                                {formError.input.Service && !formError.input.Service.state && 
                                    <span>{formError.input.Service.message}</span>
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