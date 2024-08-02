"use client";
import { Form } from "@/process/Customer/Lookup/Form";
import { useReducer, useState } from "react";
import { submitForm } from "@/process/Customer/Lookup/Submit";
import { DB_AppointmentSummary } from "@/database/Types";
import Error from "@/views/Customer/Lookup/Output/Error";
import LookupForm from "@/views/Customer/Lookup/Lookup";
import AppointmentSummary from "@/views/Customer/Lookup/Output/Summary";
import FormStateReducer from "@/hook/FormState/Reducer";
import { InitialLookupFormState } from "@/validation/State/Lookup";
import { validEmail, validUniqueIdentifier } from "@/validation/Validation";

export default function Lookup() {
    const [form, setForm] = useState(Form);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialLookupFormState);

    const [outputError, setOutputError] = useState(false);
    const [output, setOutput] = useState<DB_AppointmentSummary>();

    const submitHandler = async () => {
        const [emailState, emailMessage] = await validEmail(form.email);
        const [aptIDState, aptIDMessage] = await validUniqueIdentifier(form.appointmentID);

        formStateDispatch({
            states: {
                email: [emailState, emailMessage],
                appointmentID: [aptIDState, aptIDMessage]
            }
        });

        if (!aptIDState || !emailState)
            return;
        
        const output = await submitForm(form);
        if (!output) {
            setOutputError(true);
            setOutput(undefined);
        }
        else {
            setOutputError(false);
            setOutput(output);
        }
    }

    return (
        <>
            <div>
                {outputError && 
                    <Error
                        close={() => setOutputError(false)}
                    />
                }
                <LookupForm
                    form={form}
                    formState={formState}
                    onChange={(name, value) => {
                        setForm({...form, [`${name}`]: value});
                    }}
                    onSubmit={submitHandler}
                    updateFormState={(action) => {
                        formStateDispatch(action);
                    }}
                />
            </div>
            <div>
                {output && 
                    <AppointmentSummary
                        info={output}
                    />
                }
            </div>
        </>
    )
}