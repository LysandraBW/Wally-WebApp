import { Checkbox } from "@/components/Input/Export";
import { Services } from "@/lib/Database/Export";
import { useEffect, useState } from "react";
import ServiceInput from "./Service/ServiceInput";
import DiagnosisInput from "./Diagnosis/DiagnosisInput";
import RepairInput from "./Repair/RepairInput";
import PartInput from "./Part/PartInput";
import DiagnosisLine from "./Diagnosis/DiagnosisLine";
import ServiceLine from "./Service/ServiceLine";
import RepairLine from "./Repair/RepairLine";
import PartLine from "./Part/PartLine";
import { DB_AppointmentService, DB_Diagnosis, DB_Part, DB_Repair, DB_Service } from "@/lib/Database/Types";
import { Parts } from "@/process/Employee/Update/Form";

interface ServiceProps {
    form: {
        Services: {[serviceID: string]: DB_AppointmentService};
        Diagnoses: {[diagnosisID: string]: DB_Diagnosis};
        Repairs: {[repairID: string]: DB_Repair};
        Parts: {[partID: string]: DB_Part};
    };
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function ServiceForm(props: ServiceProps) {
    const [serviceValues, setServiceValues] = useState<{[k: string]: {[j: string]: Array<[number, string]>}}>();
    const [services, setServices] = useState<{[k: string]: DB_AppointmentService}>();

    const [counter, setCounter] = useState<number>(1);

    useEffect(() => {
        const loadServices = async () => {
            const serviceValues: {[k: string]: {[j: string]: Array<[number, string]>}} = {};
            const services: {[k: string]: DB_AppointmentService} = {};

            const dbServices = await Services();
            dbServices.forEach(service => {
                services[service.ServiceID] = {
                    ...service, 
                    AppointmentID: '', 
                    AppointmentServiceID: 0
                };

                if (service.ServiceID === 1)
                    return;

                if (!serviceValues[service.Class])
                    serviceValues[service.Class] = {};
                if (!serviceValues[service.Class][service.Division])
                    serviceValues[service.Class][service.Division] = [];
                serviceValues[service.Class][service.Division].push([service.ServiceID, service.Service]);
            });
            setServiceValues(serviceValues);
            setServices(services);
        }
        loadServices();
    }, []);

    return (
        <>
            <div>
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
                        onChange={(name, value: Array<number>) => {
                            const updatedValues = {...props.form.Services};
                            const serviceKeys: Array<string> = Object.keys(props.form.Services);
                            
                            for (let i = 0; i < serviceKeys.length; i++) {
                                const {ServiceID} = props.form.Services[`${serviceKeys[i]}`];
                                if (!ServiceID || value.includes(ServiceID))
                                    continue;
                                delete updatedValues[`${serviceKeys[i]}`];
                            }

                            let currCounter = counter;
                            const currServiceIDs = Object.values(props.form.Services).map(s => s.ServiceID);
                            for (const serviceID of value)  {
                                if (currServiceIDs.includes(serviceID))
                                    continue;
                                updatedValues[`${-currCounter}`] = services[serviceID];
                                currCounter++;
                            }
                            
                            setCounter(currCounter);
                            props.changeHandler('Services', name, updatedValues);
                        }}
                    />
                }
                <div>
                    Type in a Service Here
                    <ServiceInput
                        onChange={(name, value) => {
                            console.log('Stored Services', props.form.Services);
                            props.changeHandler('Services', name, {...props.form.Services, [`${-counter}`]: value});
                            setCounter(counter+1);
                        }}
                    />
                </div>
            </div>
            <div>
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
            </div>
            <div>
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
                                onUpdate={repair => {
                                    let modValue = props.form.Repairs;
                                    modValue[`${repairID}`] = repair;
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
            </div>
            <div>
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
            </div>
        </>
    )
}