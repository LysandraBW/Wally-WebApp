'use client';
import { useState } from 'react';
import Nav from '@/components/Nav/Default/Nav';
import Tracker from '@/components/Form/Tracker/Tracker';
import ContactForm from '@/views/Customer/Schedule/Contact';
import VehicleForm from '@/views/Customer/Schedule/Vehicle';
import ServiceForm from '@/views/Customer/Schedule/Service';
import Header from '@/views/Customer/Schedule/Header/Header';
import Image from '@/views/Customer/Schedule/Image/Image';
import { Form } from '@/submission/Customer/Schedule/Form';
import submitForm from '@/submission/Customer/Schedule/Submit';

export default function Schedule() {
    const [form, setForm] = useState(Form);

    const changeHandler = async (
        name: string, 
        value: any
    ) => {
        setForm(state => ({
            ...state, 
            [`${name}`]: value
        }));
    }

    const submitHandler = async (): Promise<boolean> => {
        const appointmentID = await submitForm(form);
        if (!appointmentID) {
            return false;
        }

        setForm(Form);
        return true;
    }

    return (
        <div className='h-full relative'>
            <Nav
                navColor='#000'
                linkColor='#FFF'
            />
            <div className='grid grid-cols-[55%_45%]'>
                <div className='px-32 py-20 flex flex-col gap-y-[40px]'>
                    <Header/>
                    <Tracker
                        parts={[
                            {
                                part: (
                                    <ContactForm
                                        form={form}
                                        onChange={changeHandler}
                                    />
                                ),
                                partHeader: 'Contact',
                                onContinue: async () => true
                            },
                            {
                                part: (
                                    <VehicleForm
                                        form={form}
                                        onChange={changeHandler}
                                    />
                                ),
                                partHeader: 'Vehicle',
                                onContinue: async () => true
                            },
                            {
                                part: (
                                    <ServiceForm
                                        form={form.services}
                                        onChange={changeHandler}
                                    />
                                ),
                                partHeader: 'Service',
                                onContinue: async () => true
                            },
                        ]}
                        onSubmit={submitHandler}
                    />
                </div>
                <Image/>
            </div>
        </div>
    )   
}