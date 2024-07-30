"use client";
import { Form, FormStructure } from "@/process/Customer/Lookup/Form";
import { useState } from "react";
import { submitForm } from "@/process/Customer/Lookup/Submit";
import AptSummary from "@/views/Customer/Lookup/Summary";
import Error from "@/views/Customer/Lookup/Error";
import LookupForm from "@/views/Customer/Lookup/Lookup";
import { DB_AppointmentSummary } from "@/database/Types";

export default function Lookup() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [error, setError] = useState(false);
    const [output, setOutput] = useState<DB_AppointmentSummary>();

    const changeHandler = async (name: string, value: any) => {
        setForm({...form, [`${name}`]: value});
    }

    const submitHandler = async (): Promise<void> => {
        const output: DB_AppointmentSummary | null = await submitForm(form);
        if (!output) {
            setError(true);
            setOutput(undefined);
        }
        else {
            setOutput(output);
            setError(false);
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
                    onChange={changeHandler}
                    onSubmit={submitHandler}
                />
            </div>
            <div>
                {output && 
                    <AptSummary
                        info={output}
                    />
                }
            </div>
        </>
    )
}