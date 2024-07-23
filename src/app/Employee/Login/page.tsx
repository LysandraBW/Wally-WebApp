"use client";
import { Button, Text } from "@/components/Input/Export";
import { Form, FormStructure } from "@/lib/Form/Employee/Login/Form";
import { submitForm } from "@/lib/Form/Employee/Login/Submit";
import { goTo } from "@/lib/Navigation/Redirect";
import Error from "@/views/Employee/Login/Error";
import { useState } from "react";

export default function Login() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);

    const changeHandler = (name: string, value: any): void => {
        setForm({...form, [`${name}`]: value});
    }
    
    const submitHandler = async (): Promise<void> => {
        const employeeID = await submitForm(form);
        if (employeeID) {
            await goTo('/Employee/Dashboard/Dashboard');
            return;
        }
        setErrorMessage(<Error close={() => setErrorMessage(null)}/>);
    }

    return (
        <>
            <div>
                {errorMessage && errorMessage}
            </div>
            <div>
                <Text
                    name="username"
                    label="Username"
                    value={form.username}
                    onChange={changeHandler}
                />
                <Text
                    name="password"
                    label="Password"
                    value={form.password}
                    onChange={changeHandler}
                />
                <Button
                    label="Login"
                    onClick={submitHandler}
                />
            </div>
        </>
    )
}