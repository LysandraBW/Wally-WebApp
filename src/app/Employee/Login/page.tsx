'use client';
import { Button, Text } from '@/components/Input/Export';
import { Form } from '@/submission/Employee/Login/Form';
import { submitForm } from '@/submission/Employee/Login/Submit';
import { goToDashboard } from '@/lib/Navigation/Redirect';
import Error from '@/views/Employee/Login/Error';
import { useReducer, useState } from 'react';
import FormStateReducer from '@/hook/State/Reducer';
import { InitialFormState } from "@/hook/State/Interface";
import { hasValue } from '@/lib/ok/Inspector/Inspect/Inspectors';

export default function Login() {
    const [form, setForm] = useState(Form);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const [loginFailed, setLoginFailed] = useState(false);

    const changeHandler = async (name: string, value: any) => {
        setForm({...form, [`${name}`]: value});
        formStateDispatch({
            name: name,
            state: await hasValue().inspect(value)
        });
    }
    
    const submitHandler = async (): Promise<void> => {
        const [usernameState, usernameMessage] = await hasValue().inspect(form.username);
        const [passwordState, passwordMessage] = await hasValue().inspect(form.password);

        formStateDispatch({
            states: {
                username: [usernameState, usernameMessage],
                password: [passwordState, passwordMessage]
            }
        });

        if (!usernameState || !passwordState)
            return;

        const employeeID = await submitForm(form);
        if (employeeID)
            await goToDashboard();
        else   
            setLoginFailed(true);
    }

    return (
        <>
            <div>
                {loginFailed && 
                    <Error
                        close={() => setLoginFailed(false)}
                    />
                }
            </div>
            <div>
                <Text
                    name='username'
                    label='Username'
                    value={form.username}
                    state={formState.input.username}
                    onChange={changeHandler}
                />
                <Text
                    name='password'
                    label='Password'
                    value={form.password}
                    state={formState.input.password}
                    onChange={changeHandler}
                />
                <Button
                    label='Login'
                    onClick={submitHandler}
                />
            </div>
        </>
    )
}