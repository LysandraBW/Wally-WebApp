"use client";
import { Form, FormStructure } from "@/process/Customer/Lookup/Form";
import { useState } from "react";
import { submitForm } from "@/process/Customer/Lookup/Submit";
import { DB_AppointmentSummary } from "@/database/Types";
import Error from "@/views/Customer/Lookup/Output/Error";
import LookupForm from "@/views/Customer/Lookup/Lookup";
import AppointmentSummary from "@/views/Customer/Lookup/Output/Summary";

export default function Lookup() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [formState, setFormState] = useState<{[k: string]: boolean}>({});
    const [error, setError] = useState(false);
    const [output, setOutput] = useState<DB_AppointmentSummary>();

    const submitHandler = async (): Promise<void> => {
        // Last-Minute Check
        const changeEvent = new Event('change');
        const inputNames = ['appointmentID', 'email'];
        inputNames.forEach(inputName => {
            const input = document.getElementsByName(inputName)[0];
            input.dispatchEvent(changeEvent);
        });

        // Error Previously Detected
        if (!formState.Lookup)
            return;
        
        // Form Submission
        const output = await submitForm(form);
        if (!output) {
            setError(true);
            setOutput(undefined);
        }
        else {
            setError(false);
            setOutput(output);
        }
    }

    return (
        <>
            <div>
                {error && 
                    <Error
                        close={() => setError(false)}
                    />
                }
                <LookupForm
                    form={form}
                    onChange={(name, value) => {
                        setForm({...form, [`${name}`]: value});
                    }}
                    onSubmit={submitHandler}
                    updateFormState={(state) => {
                        setFormState({Lookup: state});
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