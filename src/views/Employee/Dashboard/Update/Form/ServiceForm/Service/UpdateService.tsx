import { Multiple, Text } from "@/components/Input/Export";
import { DB_AppointmentService } from "@/database/Types";
import { contains } from "@/validation/Validation";
import FormStateReducer from "@/hook/State/Reducer";
import { InitialFormState } from "@/hook/State/Interface";
import { useEffect, useReducer, useState } from "react";
import ServiceCard from "./ServiceCard";

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
                            <Text
                                name={'Service'}
                                label={'Service'}
                                value={values.Service}
                                state={formState.input.Service}
                                onChange={async (name, value) => {
                                    setValues({...values, [`${name}`]: value});
                                    inspectInput('Service', values.Service, contains);
                                }}
                                onBlur={async () => {
                                    if (values.Class)
                                        return;
                                    inspectInput('Service', initialValues.Service, contains);
                                    setValues({...values, Service: initialValues.Service});
                                }}
                            />
                            <Text
                                name={'Division'}
                                value={values.Division}
                                state={formState.input.Division}
                                label={'Division'}
                                onChange={async (name, value) => {
                                    setValues({...values, [`${name}`]: value});
                                    inspectInput('Division', values.Division, contains);
                                }}
                                onBlur={async () => {
                                    if (values.Class)
                                        return;
                                    inspectInput('Division', initialValues.Division, contains);
                                    setValues({...values, Division: initialValues.Division});
                                }}
                            />
                            <Text
                                name={'Class'}
                                value={values.Class}
                                state={formState.input.Class}
                                label={'Class'}
                                onChange={async (name, value) => {
                                    setValues({...values, [`${name}`]: value});
                                    inspectInput('Class', values.Class, contains);
                                }}
                                onBlur={async () => {
                                    if (values.Class)
                                        return;
                                    inspectInput('Class', initialValues.Class, contains);
                                    setValues({...values, Class: initialValues.Class});
                                }}
                            />
                        </div>
                    )}
                />
            }
            {!edit && 
                <ServiceCard
                    class={props.service.Class}
                    division={props.service.Division}
                    service={props.service.Service}
                    onEdit={() => setEdit(true)}
                    onDelete={() => props.onDelete()}
                />
            }
        </>
    )
}