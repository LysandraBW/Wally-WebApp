"use client";
import { Form } from "@/submission/Customer/Lookup/Form";
import { useState } from "react";
import { submitForm } from "@/submission/Customer/Lookup/Submit";
import { DB_AppointmentSummary } from "@/database/Types";
import LookupForm from "@/views/Customer/Lookup/Lookup";
import Summary from "@/views/Customer/Lookup/Summary/Summary";
import Nav from "@/components/Nav/Default/Nav";
import Image from "@/views/Customer/Lookup/Image/Image";
import CloseButton from "@/components/Button/Icon/Close";
import Close from "@/components/Icon/Close/Close";

export default function Lookup() {
    const [form, setForm] = useState(Form);
    const [output, setOutput] = useState<DB_AppointmentSummary>();

    const updateForm = (
        name: string, 
        value: any
    ) => {
        setForm((form) => ({
            ...form, 
            [`${name}`]: value
        }));
    }

    const submitHandler = async () => {
        const output = await submitForm(form);
        if (!output) {
            setOutput(undefined);
        }
        else {
            setOutput(output);
        }
    }

    return (
        <div className='h-full relative flex flex-col grow'>
            <Nav
                navColor='#000'
                linkColor='#757890'
            />
            <div className='grid grid-cols-2 grow'>
                <div className='flex flex-col align-center px-32 py-20 gap-y-[40px]'>
                    <header className='flex flex-col gap-y-4 self-center w-min'>
                        <h1 className='text-center whitespace-nowrap'>Lookup Appointment</h1>
                        <p className='text-center text-sm text-gray-400'>To see your appointment details, please enter your appointment ID and email address.</p>
                    </header>
                    <div className='flex flex-col gap-y-8 h-min'>
                        <LookupForm
                            form={form}
                            onChange={(name, value) => updateForm(name, value)}
                            onSubmit={submitHandler}
                        />
                    </div>
                </div>    
                <Image/>
            </div>
            {!!output &&
                <div className='flex flex-col'>
                    <div 
                        onClick={() => setOutput(undefined)}
                        className='absolute top-8 left-8 z-20 cursor-pointer'
                    >
                        <Close
                            width='30'
                            height='30'
                            color='#FFF'    
                        />
                    </div>
                    <div className='absolute top-0 left-0 w-screen h-screen bg-[#00000020] backdrop-blur-3xl z-10'>
                        <Summary
                            info={output}
                        />
                    </div>
                </div>
            }
        </div>   
    )
}