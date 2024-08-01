 "use client";
import { useEffect, useState } from "react";
import Tracker from "@/components/Form/Tracker/Tracker";
import { Form, FormStructure } from "@/process/Customer/Schedule/Form";
import { ModelYears, LoadModels, LoadVehicle } from "@/lib/Decoder/Decoder";
import { Makes, Services } from "@/database/Export";
import { LoadedValues, Values } from "@/process/Customer/Schedule/Load";
import submitForm from "@/process/Customer/Schedule/Submit";
import ContactForm from "@/views/Customer/Schedule/Contact";
import VehicleForm from "@/views/Customer/Schedule/Vehicle";
import Success from "@/views/Customer/Schedule/Success";
import Error from "@/views/Customer/Schedule/Error";
import { inValues, isEmailAddress, isName, isPhoneNumber, isVIN } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { ErrorStructure } from "@/lib/Inspector/Inspectors";

export default function Schedule() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [error, setError] = useState<ErrorStructure>({});
    const [values, setValues] = useState<LoadedValues>(Values);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const load = async () => {
            // Load Makes and Model Years
            const makes: Array<[string, string]> = (await Makes()).map(m => [m.Make, m.Make]);
            const modelYears: Array<[number, string]> = (await ModelYears()).map(y => [y, y.toString()]);
            
            // Load Services
            const services: {[k: string]: Array<[number, string]>} = {};
            const dbServices = await Services();
            dbServices.forEach(service => {
                // 'Unknown' Option is Hard-Coded
                if (service.ServiceID === 1)
                    return;
                else if (services[service.Class])
                    services[service.Class].push([service.ServiceID, service.Service]);
                else
                    services[service.Class] = [[service.ServiceID, service.Service]];
            });
            
            setValues({...values, makes, modelYears, services});
        }
        load();

    }, []);

    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setValues({...values, models});
    }

    const loadVehicle = async (vin: string) => {
        if (!vin)
            return;

        const data = await LoadVehicle(vin, values.makes);
        if (!data.make)        
            return;

        setValues({
            ...values,
            models: data.models
        });
        return data;
    }

    const inspectContactInput = async (): Promise<boolean> => {
        const [fNameState, fNameMessage] = await isName().inspect(form.fName);
        const [lNameState, lNameMessage] = await isName().inspect(form.lName);
        const [emailState, emailMessage] = await isEmailAddress().inspect(form.email);
        const [phoneState, phoneMessage] = await isPhoneNumber().inspect(form.phone);

        setError({
            fName: {
                state: fNameState,
                message: fNameMessage
            },
            lName: {
                state: lNameState,
                message: lNameMessage
            },
            email: {
                state: emailState,
                message: emailMessage
            },
            phone: {
                state: phoneState,
                message: phoneMessage
            }
        });

        return fNameState && lNameState && emailState && phoneState;
    }

    const inspectVehicleInput = async (): Promise<boolean> => {
        const [makeState, makeMessage] = await inValues({
            values: values.makes.map(m => m[0])
        }).inspect(form.make);

        const [modelState, modelMessage] = await inValues({
            values: values.models.map(m => m[0])
        }).inspect(form.model);

        const [modelYearState, modelYearMessage] = await inValues({
            values: values.modelYears.map(m => m[0])
        }).inspect(form.modelYear);

        const [vinState, vinMessage] = await isVIN({
            optional: true
        }).inspect(form.vin);

        const [servicesState, servicesMessage] = await inValues({
            values: Object.values(values.services).flat().map(s => s[0])
        }).inspect(form.services);

        setError({
            make: {
                state: makeState,
                message: makeMessage
            },
            model: {
                state: modelState,
                message: modelMessage
            },
            modelYear: {
                state: modelYearState,
                message: modelYearMessage
            },
            vin: {
                state: vinState,
                message: vinMessage
            },
            services: {
                state: servicesState,
                message: servicesMessage
            }
        });

        return makeState && modelState && modelYearState && vinState && servicesState;
    }

    const changeHandler = async (name: string, value: any) => {
        if (form[name] === value)
            return;

        if (name === "vin") {
            const validVIN = (await isVIN().inspect(value))[0];
            if (validVIN) {
                const data = await loadVehicle(value);
                if (!data)
                    return;
                setForm({...form, ...data, [`${name}`]: value});
            }
            else {
                setForm({...form, [`${name}`]: value});
            }
        }
        else if (name === "make") {
            loadModels(form.modelYear[0], value[0]);
            setForm({...form, model: [], [`${name}`]: value});
        }
        else if (name === "modelYear") {
            loadModels(value[0], form.make[0]);
            setForm({...form, model: [], [`${name}`]: value});
        }
        else {
            setForm({...form, [`${name}`]: value});
        }
    }
    
    const submitHandler = async (): Promise<boolean> => {
        const appointmentID = await submitForm(form);

        if (appointmentID) {
            setMessage(appointmentID);
            setForm(Form);
            return true;
        }
        else {
            setMessage('Error');
            return false;
        }
    }

    return (
        <>
            {message && message}
            {message.length === 36 &&
                <Success
                    ID={message}
                    close={() => setMessage(' ')}
                />
            }
            {message === 'Error' &&
                <Error
                    close={() => setMessage(' ')}
                />
            }

            <Tracker
                parts={[
                    {
                        partHeader: "Contact",
                        part: (
                            <ContactForm
                                form={form}
                                onChange={changeHandler}
                                error={error}
                            />
                        ),
                        onContinue: async () => await inspectContactInput()
                    },
                    {
                        partHeader: "Vehicle",
                        part: (
                            <VehicleForm
                                form={form}
                                values={{...values}}
                                onChange={changeHandler}
                                error={error}
                            />
                        ),
                        onContinue: async () => await inspectVehicleInput() 
                    }
                ]}
                onSubmit={submitHandler}
            />
        </>
    )   
}