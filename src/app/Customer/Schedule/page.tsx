 "use client";
import { useEffect, useState } from "react";
import Tracker from "@/components/Form/Tracker/Tracker";
import { Form, FormStructure } from "@/process/Customer/Schedule/Form";
import { ModelYears, LoadModels, LoadVehicle } from "@/lib/Decoder/Decoder";
import { Makes, Services } from "@/database/Export";
import { LoadedValuesStructure, LoadedValues } from "@/process/Customer/Schedule/Load";
import submitForm from "@/process/Customer/Schedule/Submit";
import ContactForm from "@/views/Customer/Schedule/Contact";
import VehicleForm from "@/views/Customer/Schedule/Vehicle";
import Success from "@/views/Customer/Schedule/Output/Success";
import Error from "@/views/Customer/Schedule/Output/Error";
import { validVIN } from "@/validation/Validation";

export default function Schedule() {
    const [form, setForm] = useState<FormStructure>(Form);
    const [formStates, setFormStates] = useState<{[formName: string]: boolean}>({});

    const [loadedValues, setLoadedValues] = useState<LoadedValuesStructure>(LoadedValues);
    const [createdAptID, setCreatedAptID] = useState<string>(' ');

    useEffect(() => {
        const load = async () => {
            // Load Makes and Model Years
            const makes:        Array<[string, string]> = (await Makes()).map(m => [m.Make, m.Make]);
            const modelYears:   Array<[number, string]> = (await ModelYears()).map(y => [y, y.toString()]);
            
            // Load Services
            const services: {[k: string]: Array<[number, string]>} = {};
            (await Services()).forEach(service => {
                // 'Unknown' Option is Hard-Coded
                if (service.ServiceID === 1)
                    return;
                
                if (!services[service.Class])
                    services[service.Class] = [];
                services[service.Class].push([service.ServiceID, service.Service]);
            });
            
            setLoadedValues({...loadedValues, makes, modelYears, services});
        }
        load();
    }, []);

    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setLoadedValues({
            ...loadedValues, 
            models
        });
    }

    const loadVehicle = async (vin: string) => {
        if (!vin)
            return;

        const data = await LoadVehicle(vin, loadedValues.makes);
        if (!data.decoded)        
            return;

        setLoadedValues({
            ...loadedValues,
            models: data.models
        });
        
        return data;
    }

    const changeHandler = async (name: string, value: any) => {
        if (form[name] === value)
            return;

        if (name === "make") {
            loadModels(form.modelYear[0], value[0]);
            setForm({...form, model: [], [`${name}`]: value});
        }
        else if (name === "modelYear") {
            loadModels(value[0], form.make[0]);
            setForm({...form, model: [], [`${name}`]: value});
        }
        else if (name === "vin") {
            const valid = (await validVIN(value))[0];
            if (!valid) {
                setForm({...form, [`${name}`]: value});
                return;
            }
            
            const data = await loadVehicle(value);
            if (!data)
                return;
            setForm({...form, ...data, [`${name}`]: value});
        }
        else {
            setForm({...form, [`${name}`]: value});
        }
    }

    const submitHandler = async (): Promise<boolean> => {
        if (!formStates.Contact || !formStates.Vehicle)
            return false;

        const appointmentID = await submitForm(form);

        if (!appointmentID) {
            setCreatedAptID('');
            return false;
        }

        setCreatedAptID(appointmentID);
        setForm(Form);
        return true;
    }

    const inspectContactInput = async (): Promise<boolean> => {
        if (formStates.Contact)
            return true;

        const changeEvent = new Event('change');
        const inputNames = ['fName', 'lName', 'email', 'phone'];
        inputNames.forEach(inputName => {
            const input = document.getElementsByName(inputName)[0];
            input.dispatchEvent(changeEvent);
        });

        return false;
    }

    const inspectVehicleInput = async (): Promise<boolean> => {
        if (formStates.Vehicle)
            return true;

        const changeEvent = new Event('change');
        const inputNames = ['make', 'model', 'modelYear', 'vin', 'services'];
        inputNames.forEach(inputName => {
            const input = document.getElementsByName(inputName)[0];
            input.dispatchEvent(changeEvent);
        });

        return false;
    }

    return (
        <>
            {/* Appointment Created */}
            {createdAptID.length === 36 &&
                <Success
                    ID={createdAptID}
                    close={() => setCreatedAptID(' ')}
                />
            }
            {/* Appointment Could Not be Created */}
            {!createdAptID &&
                <Error
                    close={() => setCreatedAptID(' ')}
                />
            }
            {/* Form */}
            <Tracker
                parts={[
                    {
                        part: (
                            <ContactForm
                                form={form}
                                onChange={changeHandler}
                                updateFormState={(state) => {
                                    setFormStates({
                                        ...formStates,
                                        'Contact': state
                                    });
                                }}
                            />
                        ),
                        partHeader: "Contact",
                        onContinue: async () => await inspectContactInput()
                    },
                    {
                        part: (
                            <VehicleForm
                                form={form}
                                loadedValues={{...loadedValues}}
                                onChange={changeHandler}
                                updateFormState={(state) => {
                                    setFormStates({
                                        ...formStates,
                                        'Vehicle': state
                                    });
                                }}
                            />
                        ),
                        partHeader: "Vehicle",
                        onContinue: async () => await inspectVehicleInput() 
                    }
                ]}
                onSubmit={submitHandler}
            />
        </>
    )   
}