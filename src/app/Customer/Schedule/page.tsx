 "use client";
import { useEffect, useState } from "react";
import Tracker from "@/components/Form/Tracker/Tracker";
import { Form, FormStructure } from "@/lib/Form/Customer/Schedule/Form";
import { ModelYears, Models, DecodeVIN } from "@/lib/Decoder/Decoder";
import { GetMake } from "@/lib/Database/Export";
import { GetService } from "@/lib/Database/Export";
import { LoadedValues, Values } from "@/lib/Form/Customer/Schedule/Load";
import submitForm from "@/lib/Form/Customer/Schedule/Submit";
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
            const makes: Array<[string, string]> = (await GetMake()).map(m => [m.Make, m.Make]);
            const modelYears: Array<[number, string]> = (await ModelYears()).map(y => [y, y.toString()]);
            
            // Load Services
            const services: {[k: string]: Array<[number, string]>} = {};
            const fetchedServices = await GetService();
            fetchedServices.forEach(service => {
                // 'Unknown' Option is Done Elsewhere
                if (service.ServiceID === 1)
                    return;
                else if (services[service.Type])
                    services[service.Type].push([service.ServiceID, service.Service]);
                else
                    services[service.Type] = [[service.ServiceID, service.Service]];
            });
            
            setValues({...values, makes, modelYears, services});
        }
        load();

    }, []);

    const loadModels = async (modelYear: number, make: string) => {
        // Requires Model Year + Make
        if (modelYear && make) {
            // Get Models
            const fetchedModels = (await Models(modelYear, make));
            let models: Array<[string, string]> = fetchedModels.map(m => [m.Model_Name, m.Model_Name]);

            // Removing Duplicates
            let duplicateModels: {[k: string]: number} = {};
            models = models.filter(model => {
                // Duplicate Found
                if (duplicateModels[model[0]])
                    return false;
                duplicateModels[model[0]] = 1;
                return true;
            });

            // Sorting by Label
            models.sort((a, b) => a[1].localeCompare(b[1]));
            setValues({...values, models});
        }
        else {
            setValues({...values, models: []});
        }
    }

    const loadMakeModelModelYear = async (vin: string) => {
        if (!vin)
            return;

        // Getting Make, Model, ModelYear (MMMY)
        const MMMY = await DecodeVIN(vin);
        const Make = values.makes.find(m => m[0].toUpperCase() === MMMY.Make.toUpperCase());
        const Model = MMMY.Model;
        const ModelYear = MMMY.ModelYear;

        if (!Make)
            return;

        // Load Models
        loadModels(ModelYear, Make[0]);
        
        // Return Decoded Info
        return {
            make: [Make[0]], 
            model: [Model], 
            modelYear: [ModelYear]
        }
    }

    const changeHandler = async (name: string, value: any) => {
        // Nothing Changed
        if (form[name] === value)
            return;

        if (name === "vin") {
            const MMMY = await loadMakeModelModelYear(value);
            if (!MMMY)
                return;

            // Load Model Year, Make, and Model
            setForm({...form, ...MMMY, [`${name}`]: value});
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

    const continueHandler = (part: number): boolean => {
        return true;
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
                        )
                    },
                    {
                        partHeader: "Vehicle",
                        part: (
                            <VehicleForm
                                form={form}
                                values={{...values}}
                                changeHandler={changeHandler}
                            />
                        )
                    }
                ]}
                continue={continueHandler}
                submit={submitHandler}
            />
        </>
    )   
}