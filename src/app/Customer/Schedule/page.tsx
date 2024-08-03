'use client';
import { useEffect, useReducer, useState } from 'react';
import Tracker from '@/components/Form/Tracker/Tracker';
import { Form } from '@/submission/Customer/Schedule/Form';
import { LoadedServices } from '@/submission/Customer/Schedule/Load';
import submitForm from '@/submission/Customer/Schedule/Submit';
import ContactForm from '@/views/Customer/Schedule/Contact';
import VehicleForm from '@/views/Customer/Schedule/Vehicle';
import Success from '@/views/Customer/Schedule/Output/Success';
import Error from '@/views/Customer/Schedule/Output/Error';
import FormStateReducer from '@/hook/State/Reducer';
import { InitialContactFormState } from '@/validation/State/Contact';
import { InitialVehicleFormState } from '@/validation/State/Vehicle';
import { validEmail, validMake, validModel, validModelYear, validName, validPhone, validServices, validValue, validVIN } from '@/validation/Validation';
import useVehicle from '@/hook/Vehicle/Vehicle';
import { loadMakes, loadModelYears } from '@/lib/Vehicle/Load';
import { getValues } from "@/lib/Vehicle/Value";
import { loadServices } from "@/lib/Service/Load";
import { flattenValues } from "@/lib/Service/Value";

export default function Schedule() {
    const [form, setForm] = useState(Form);
    const [contactFormState, contactFormStateDispatch] = useReducer(FormStateReducer, InitialContactFormState);
    const [vehicleFormState, vehicleFormStateDispatch] = useReducer(FormStateReducer, InitialVehicleFormState);
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
            setLoadedServices({services});
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

    const inspectContactInput = async (): Promise<boolean> => {
        if (contactFormState.state)
            return true;

        const [fNameState, fNameMessage] = await validName(form.fName);
        const [lNameState, lNameMessage] = await validName(form.lName);
        const [emailState, emailMessage] = await validEmail(form.email);
        const [phoneState, phoneMessage] = await validPhone(form.phone);

        contactFormStateDispatch({
            states: {
                fName: [fNameState, fNameMessage],
                lName: [lNameState, lNameMessage],
                email: [emailState, emailMessage],
                phone: [phoneState, phoneMessage]
            }
        });

        return fNameState && lNameState && emailState && phoneState;
    }

    const inspectVehicleInput = async (): Promise<boolean> => {
        if (vehicleFormState.state)
            return true;

        const [vinState, vinMessage] = await validVIN(vehicle.vin);
        const [makState, makMessage] = await validValue([vehicle.make], getValues(vehicle.loadedMakes));
        const [mdlState, mdlMessage] = await validValue([vehicle.model], getValues(vehicle.loadedModels));
        const [mdyState, mdyMessage] = await validValue([vehicle.modelYear], getValues(vehicle.loadedModelYears));
        const [serState, serMessage] = await validValue(form.services, flattenValues(loadedServices.services));

        vehicleFormStateDispatch({
            states: {
                services:   [serState, serMessage],
                make:       [makState, makMessage],
                model:      [mdlState, mdlMessage],
                modelYear:  [mdyState, mdyMessage],
                vin:        [vinState, vinMessage]
            }
        });

        return mdyState && makState && mdlState && serState && vinState;
    }

    const submitHandler = async (): Promise<boolean> => {
        if (!contactFormState.state || !vehicleFormState.state)
            return false;

        const appointmentID = await submitForm({...form, ...vehicle.form});
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
                    ID={createdAptID}
                    close={() => setCreatedAptID(' ')}
                />
            }
            {!createdAptID &&
                <Error
                    close={() => setCreatedAptID(' ')}
                />
            }
            <Tracker
                parts={[
                    {
                        part: (
                            <ContactForm
                                form={form}
                                formState={contactFormState}
                                onChange={changeHandler}
                                updateFormState={(action) => {
                                    contactFormStateDispatch(action);
                                }}
                            />
                        ),
                        partHeader: 'Contact',
                        onContinue: async () => await inspectContactInput()
                    },
                    {
                        part: (
                            <VehicleForm
                                form={{
                                    ...form, 
                                    ...vehicle.form
                                }}
                                formState={vehicleFormState}
                                loadedValues={{
                                    ...loadedServices, 
                                    ...vehicle.loadedValues
                                }}
                                onChange={changeHandler}
                                updateFormState={(action) => {
                                    vehicleFormStateDispatch(action);
                                }}
                            />
                        ),
                        partHeader: 'Vehicle',
                        onContinue: async () => await inspectVehicleInput() 
                    }
                ]}
                onSubmit={submitHandler}
            />
        </>
    )   
}