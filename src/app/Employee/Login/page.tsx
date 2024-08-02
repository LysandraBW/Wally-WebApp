'use client';
import { Button, Text } from '@/components/Input/Export';
import { Form, FormStructure } from '@/process/Employee/Login/Form';
import { submitForm } from '@/process/Employee/Login/Submit';
import { goToDashboard } from '@/lib/Navigation/Redirect';
import Error from '@/views/Employee/Login/Error';
import { useReducer, useState } from 'react';
import FormStateReducer, { InitialFormState } from '@/reducer/FormState/Reducer';
import { hasValue } from '@/lib/Inspector/Inspector/Inspect/Inspectors';

export default function Login() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const changeHandler = async (name: string, value: any) => {
        formStateDispatch({
            name: name,
            state: await hasValue().inspect(value)
        });
        setForm({...form, [`${name}`]: value});
    }
    
    const submitHandler = async (): Promise<void> => {
        if (!formState.state)
            return;

        const employeeID = await submitForm(form);
        if (employeeID)
            await goToDashboard();
        else   
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
                    name='username'
                    label='Username'
                    value={form.username}
                    error={formState.input.username}
                    onChange={changeHandler}
                />
                <Text
                    name='password'
                    label='Password'
                    value={form.password}
                    error={formState.input.password}
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