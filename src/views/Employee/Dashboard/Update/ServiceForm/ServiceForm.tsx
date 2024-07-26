import { Checkbox } from "@/components/Input/Export";
import { Services } from "@/lib/Database/Export";
import { Diagnosis, Repair, Part, Parts, Service as _Service } from "@/lib/Form/Employee/Update/Form"
import { useEffect, useRef, useState } from "react";
import ServiceInput from "./ServiceInput";
import DiagnosisInput from "./DiagnosisInput";
import RepairInput from "./RepairInput";
import PartInput from "./PartInput";

import DiagnosisLine from "./Diagnosis";
import ServiceLine from "./ServiceLine";
import RepairLine from "./RepairLine";
import PartLine from "./PartLine";

interface Service {
    Class: string;
    ClassID: number;
    Division: string;
    DivisionID: number;
    Service: string;
    ServiceID: number;
}

interface ServiceProps {
    form: {
        Services: {[serviceID: string]: _Service};
        Diagnoses: {[diagnosisID: string]: Diagnosis};
        Repairs: {[repairID: string]: Repair};
        Parts: {[partID: string]: Part};
    };
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function ServiceForm(props: ServiceProps) {
    const [serviceValues, setServiceValues] = useState<{[k: string]: {[j: string]: Array<[number, string]>}}>();
    const [services, setServices] = useState<{[k: string]: Service}>();

    const [counter, setCounter] = useState<number>(1);

    useEffect(() => {
        const loadServices = async () => {
            const serviceValues: {[k: string]: {[j: string]: Array<[number, string]>}} = {};
            const services: {[k: string]: Service} = {};

            const dbServices = await Services();
            dbServices.forEach(service => {
                if (service.ServiceID === 1)
                    return;

                if (!serviceValues[service.Class])
                    serviceValues[service.Class] = {};

                if (!serviceValues[service.Class][service.Division])
                    serviceValues[service.Class][service.Division] = [];

                serviceValues[service.Class][service.Division].push([service.ServiceID, service.Service]);

                services[service.ServiceID] = service;
            });

            setServiceValues(serviceValues);
            setServices(services);
        }
        loadServices();
    }, []);

    return (
        <>
            <div>
                Current Services
                {Object.entries(props.form.Services).map(([serviceID, service], i) => (
                    <div key={i}>
                        <ServiceLine
                            service={service}
                            onDelete={() => {
                                let modValue = props.form.Services;
                                delete modValue[`${serviceID}`];
                                props.changeHandler('Services', 'Services', modValue);
                            }}
                            onUpdate={(service) => {
                                let modValue = props.form.Services;
                                props.form.Services[`${serviceID}`] = service;
                                props.changeHandler('Services', 'Services', modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            {serviceValues && services &&
                <Checkbox
                    name='Services'
                    value={Object.values(props.form.Services).map(s => s.ServiceID)}
                    values={serviceValues}
                    label={'Services'}
                    onChange={(name, value) => {
                        const modValue: {[k: number]: _Service} = props.form.Services;
                        for (const serviceID of value)
                            modValue[serviceID] = services[serviceID];

                        props.changeHandler('Services', name, modValue);
                    }}
                />
            }
            <div>
                Type in a Service Here
                <ServiceInput
                    name={`Services`}
                    onChange={(name, value) => {
                        console.log('Stored Services', props.form.Services);
                        props.changeHandler('Services', name, {...props.form.Services, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
            <div>
                Current Diagnoses
                {Object.entries(props.form.Diagnoses).map(([diagnosisID, diagnosis], i) => (
                    <div key={i}>
                        <DiagnosisLine
                            diagnosis={diagnosis}
                            onDelete={() => {
                                let modValue = props.form.Diagnoses;
                                delete modValue[`${diagnosisID}`];
                                props.changeHandler('Services', 'Diagnoses', modValue);
                            }}
                            onUpdate={(diagnosis) => {
                                let modValue = props.form.Diagnoses;
                                props.form.Diagnoses[`${diagnosisID}`] = diagnosis;
                                props.changeHandler('Services', 'Diagnoses', modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Diagnosis Here
                <DiagnosisInput
                    onChange={(name, value) => {
                        console.log('Stored Diagnoses', props.form.Diagnoses);
                        props.changeHandler('Services', name, {...props.form.Diagnoses, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
            <div>
                Current Repairs
                {Object.entries(props.form.Repairs).map(([repairID, repair], i) => (
                    <div key={i}>
                        <RepairLine
                            repair={repair}
                            onDelete={() => {
                                let modValue = props.form.Repairs;
                                delete modValue[`${repairID}`];
                                props.changeHandler('Services', 'Repairs', modValue);
                            }}
                            onUpdate={(repair) => {
                                let modValue = props.form.Repairs;
                                props.form.Repairs[`${repairID}`] = repair;
                                props.changeHandler('Services', 'Repairs', modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Repair Here
                <RepairInput
                    onChange={(name, value) => {
                        console.log('Stored Repairs', props.form.Repairs);
                        props.changeHandler('Services', name, {...props.form.Repairs, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
            <div>
                Current Parts
                {Object.entries(props.form.Parts).map(([partID, part], i) => (
                    <div key={i}>
                        <PartLine
                            part={part}
                            onDelete={() => {
                                let modValue = props.form.Parts;
                                delete modValue[`${partID}`];
                                props.changeHandler('Services', 'Parts', modValue);
                            }}
                            onUpdate={(part) => {
                                let modValue = props.form.Parts;
                                props.form.Parts[`${partID}`] = part;
                                props.changeHandler('Services', 'Parts', modValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                Type in a Part Here
                <PartInput
                    onChange={(name, value) => {
                        console.log('Stored Parts', props.form.Parts);
                        props.changeHandler('Services', name, {...props.form.Parts, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </>
    )
}