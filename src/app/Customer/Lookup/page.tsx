"use client";
import { Form, FormStructure } from "@/lib/Form/Customer/Lookup/Form";
import { useState } from "react";
import { submitForm } from "@/lib/Form/Customer/Lookup/Submit";
import { AppointmentSummary } from "@/lib/Database/Appointment/Appointment";
import Summary from "@/views/Customer/Lookup/Summary";
import Error from "@/views/Customer/Lookup/Error";
import LookupForm from "@/views/Customer/Lookup/Lookup";

export default function Lookup() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);
    const [summary, setSummary] = useState<React.ReactNode>(null);

    const changeHandler = async (name: string, value: any) => {
        setForm({...form, [`${name}`]: value});
    }

    const submitHandler = async (): Promise<void> => {
        const output: AppointmentSummary | null = await submitForm(form);
        if (!output) {
            setErrorMessage(<Error close={() => setErrorMessage(null)}/>);
            setSummary(null);
        }
        else {
            setSummary(<Summary info={output}/>);
            setErrorMessage(null);
        }
    }

    return (
        <>
            <div>
                {errorMessage && errorMessage}
                <LookupForm
                    form={form}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
            <div>
                {summary && summary}
            </div>
        </>
    )
}