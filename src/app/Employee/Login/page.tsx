"use client";
import { Button, Text } from "@/components/Input/Export";
import { Form, FormStructure } from "@/process/Employee/Login/Form";
import { submitForm } from "@/process/Employee/Login/Submit";
import { goTo, goToDashboard } from "@/lib/Navigation/Redirect";
import Error from "@/views/Employee/Login/Error";
import { useReducer, useState } from "react";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";
import { hasValue } from "@/lib/Inspector/Inspector/Inspect/Inspectors";

export default function Login() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const changeHandler = async (name: string, value: any) => {
        formErrorDispatch({
            name,
            inspection: await hasValue().inspect(value)
        });
        setForm({...form, [`${name}`]: value});
    }
    
    const submitHandler = async (): Promise<void> => {
        const employeeID = await submitForm(form);
        if (employeeID) {
            await goToDashboard();
            return;
        }
        setErrorMessage(true);
    }

    return (
        <>
            <div>
                {errorMessage && 
                    <Error
                        close={() => setErrorMessage(false)}
                    />
                }
            </div>
            <div>
                <Text
                    name="username"
                    label="Username"
                    error={formError.input.username}
                    value={form.username}
                    onChange={changeHandler}
                />
                <Text
                    name="password"
                    label="Password"
                    error={formError.input.password}
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