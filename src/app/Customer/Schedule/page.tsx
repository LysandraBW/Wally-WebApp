 "use client";
import { useEffect, useState } from "react";
import Tracker from "@/components/Form/Tracker/Tracker";
import { Form, FormStructure } from "@/process/Customer/Schedule/Form";
import { ModelYears, Models, DecodeVIN, LoadModels, LoadMakeModelModelYear } from "@/lib/Decoder/Decoder";
import { Makes, Services } from "@/lib/Database/Export";
import { LoadedValues, Values } from "@/process/Customer/Schedule/Load";
import submitForm from "@/process/Customer/Schedule/Submit";
import ContactForm from "@/views/Customer/Schedule/Contact";
import VehicleForm from "@/views/Customer/Schedule/Vehicle";
import Success from "@/views/Customer/Schedule/Success";
import Error from "@/views/Customer/Schedule/Error";

export default function Schedule() {
    const [form, setForm] = useState<FormStructure>(Form);
    // Loaded Values for Inputs (i.e. Dropdown, Checkbox)
    const [values, setValues] = useState<LoadedValues>(Values);
    // Message after Submission
    const [message, setMessage] = useState<React.ReactNode>(null);

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

    const loadMakeModelModelYear = async (vin: string) => {
        if (!vin)
            return;

        const {make, model, models, modelYear} = await LoadMakeModelModelYear(vin, values.makes);
        if (!modelYear)        
            return;

        setValues({...values, models});

        return {
            make: make, 
            model: model, 
            modelYear: modelYear
        }
    }

    const changeHandler = async (name: string, value: any) => {
        if (form[name] === value)
            return;

        if (name === "vin") {
            const data = await loadMakeModelModelYear(value);
            if (!data)
                return;
            setForm({...form, ...data, [`${name}`]: value});
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
            alert("Success" + appointmentID);
            setMessage((
                <Success
                    ID={appointmentID}
                    close={() => setMessage(null)}
                />
            ));
            setForm(Form);
            return true;
        }
        else {
            alert("Error");
            setMessage((
                <Error
                    close={() => setMessage(null)}
                />
            ));
            return false;
        }
    }

    return (
        <>
            {message && message}
            <Tracker
                parts={[
                    {
                        partHeader: "Contact",
                        part: (
                            <ContactForm
                                form={form}
                                changeHandler={changeHandler}
                            />
                        ),
                        onContinue: () => true
                    },
                    {
                        partHeader: "Vehicle",
                        part: (
                            <VehicleForm
                                form={form}
                                values={{...values}}
                                changeHandler={changeHandler}
                            />
                        ),
                        onContinue: () => true
                    }
                ]}
                submit={submitHandler}
            />
        </>
    )   
}