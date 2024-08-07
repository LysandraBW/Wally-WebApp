'use client';
import { useEffect, useState } from 'react';
import Tracker from '@/components/Form/Tracker/Tracker';
import { Form } from '@/submission/Customer/Schedule/Form';
import { LoadedServices } from '@/submission/Customer/Schedule/Load';
import submitForm from '@/submission/Customer/Schedule/Submit';
import ContactForm from '@/views/Customer/Schedule/Contact';
import VehicleForm from '@/views/Customer/Schedule/Vehicle';
import Success from '@/views/Customer/Schedule/Output/Success';
import Error from '@/views/Customer/Schedule/Output/Error';
import useVehicle from '@/hook/Vehicle/Vehicle';
import { loadMakes, loadModelYears } from '@/lib/Vehicle/Load';
import { loadServices } from "@/lib/Service/Load";
import Nav from '@/components/Nav/Default/Default';
import ServiceForm from '@/views/Customer/Schedule/Service';

export default function Schedule() {
    const [form, setForm] = useState(Form);
    const vehicle = useVehicle();

    const [loadedServices, setLoadedServices] = useState(LoadedServices);
    const [createdAptID, setCreatedAptID] = useState(' ');

    useEffect(() => {
        const load = async () => {
            vehicle.setLoadedData(
                await loadMakes(), 
                await loadModelYears()
            );
            const services = await loadServices();
            setLoadedServices(services);
        }
        load();
    }, []);

    const changeHandler = async (name: string, value: any) => {
        switch (name) {
            case 'make':
                vehicle.setMake(value[0]);
                break;
            case 'modelYear':
                vehicle.setModelYear(value[0]);
                break;
            case 'model':
                vehicle.setModel(value[0]);
                break;
            case 'vin':
                vehicle.setVIN(value);
                break;
            default:
                setForm((state) => ({...state, [`${name}`]: value}));
                break;
        }
    }

    const submitHandler = async (): Promise<boolean> => {
        const appointmentID = await submitForm({
            ...form, 
            ...vehicle.form
        });
        
        if (!appointmentID) {
            setCreatedAptID('');
            return false;
        }

        setCreatedAptID(appointmentID);
        setForm(Form);
        return true;
    }

    return (
        <>
            {createdAptID.length > 1 &&
                <Success
                    aptID={createdAptID}
                    close={() => setCreatedAptID(' ')}
                />
            }
            {!createdAptID &&
                <Error
                    close={() => setCreatedAptID(' ')}
                />
            }
            <Nav/>
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
                                form={vehicle.form}
                                loadedValues={vehicle.loadedValues}
                                onChange={changeHandler}
                            />
                        ),
                        partHeader: 'Vehicle',
                        onContinue: async () => true
                    },
                    {
                        part: (
                            <ServiceForm
                                services={form.services}
                                loadedServices={loadedServices}
                                onChange={changeHandler}
                            />
                        ),
                        partHeader: 'Service',
                        onContinue: async () => true
                    },
                ]}
                onSubmit={submitHandler}
            />
        </>
    )   
}