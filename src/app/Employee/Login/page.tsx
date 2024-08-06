'use client';
import { Button, Text } from '@/components/Input/Export';
import { Form } from '@/submission/Employee/Login/Form';
import { submitForm } from '@/submission/Employee/Login/Submit';
import { goToDashboard } from '@/lib/Navigation/Navigation';
import Error from '@/views/Employee/Login/Error';
import { useReducer, useState } from 'react';
import FormStateReducer from '@/hook/State/Reducer';
import { InitialFormState } from "@/hook/State/Interface";
import { hasLength } from '@/validation/Validation';
import MinimalNav from '@/components/Nav/Minimal/Minimal';

export default function Login() {
    const [form, setForm] = useState(Form);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const [loginFailed, setLoginFailed] = useState(false);

    const changeHandler = async (name: string, value: any) => {
        setForm({
            ...form, 
            [`${name}`]: value
        });
        
        formStateDispatch({
            states: {
                [`${name}`]: await hasLength(value)
            }
        });
    }
    
    const submitHandler = async (): Promise<void> => {
        const [usernameState, usernameMessage] = await hasLength(form.username);
        const [passwordState, passwordMessage] = await hasLength(form.password);

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
        <div className='h-full flex flex-col grow'>
            <div>
                {loginFailed && 
                    <Error
                        close={() => setLoginFailed(false)}
                    />
                }
            </div>
            <MinimalNav/>
            <div className='flex grow'>
                <div 
                    style={{'boxShadow': 'inset -1px 1px 54px -22px #121010b3, inset -30px 30px 88px 20px #0000001f'}}
                    className="bg-[url('/Images/WhiteBMW.webp')] w-[50%] bg-cover bg-center rounded-tr-[13px]">
                </div>
                <div className='flex justify-center items-center w-[50%]'>
                    <div className='w-[50%] flex flex-col gap-y-[16px]'>
                        <header className='flex flex-col gap-y-[0px] items-center'>
                            <h1 className='text-[36px] font-semibold tracking-[-1.5px] leading-[1.125]'>Welcome Back</h1>
                            <p className='font-[400] text-gray-400'>Please enter your details.</p>
                        </header>
                        <div className='w-full flex flex-col gap-y-[16px]'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}