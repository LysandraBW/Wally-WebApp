import { Services } from "@/database/Export";
import { DB_AppointmentService } from "@/database/Types";
import { useEffect, useState } from "react";
import UpdateService from "./UpdateService";
import { Checkbox } from "@/components/Input/Export";
import CreateService from "./CreateService";

interface ServiceManagerProps {
    services: {[serviceID: string]: DB_AppointmentService};
    onChange: (updatedValue: {[serviceID: string]: DB_AppointmentService}) => void;
}

export default function ServiceManager(props: ServiceManagerProps) {
    const [services, setServices] = useState<{[k: string]: DB_AppointmentService}>();
    const [serviceValues, setServiceValues] = useState<{[k: string]: {[j: string]: Array<[number, string]>}}>();
    const [counter, setCounter] = useState<number>(1);

    useEffect(() => {
        const load = async () => {
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
        load();
    }, []);

    return (
        <div>
            <div>
                Current Services
                {Object.entries(props.services).map(([serviceID, service], i) => (
                    <div key={i}>
                        <UpdateService
                            service={service}
                            onDelete={() => {
                                let updatedValue = props.services;
                                delete updatedValue[`${serviceID}`];
                                props.onChange(updatedValue);
                            }}
                            onUpdate={(service) => {
                                let updatedValue = props.services;
                                props.services[`${serviceID}`] = service;
                                props.onChange(updatedValue);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                {/* Checkboxes */}
                {serviceValues && services &&
                    <div>
                        <Checkbox
                            name='Services'
                            label={'Services'}
                            value={Object.values(props.services).map(s => s.ServiceID)}
                            values={serviceValues}
                            onChange={(name, value: Array<number>) => {
                                const updatedValues = {...props.services};

                                // Deleting the Now-Deleted Services
                                const serviceKeys: Array<string> = Object.keys(props.services);
                                for (let i = 0; i < serviceKeys.length; i++) {
                                    const {ServiceID} = props.services[`${serviceKeys[i]}`];
                                    if (!ServiceID || value.includes(ServiceID))
                                        continue;
                                    delete updatedValues[`${serviceKeys[i]}`];
                                }

                                // Adding the Now-Added Services
                                let currentCounter = counter;
                                const currentServiceIDs = Object.values(props.services).map(s => s.ServiceID);
                                for (const serviceID of value)  {
                                    if (currentServiceIDs.includes(serviceID))
                                        continue;
                                    updatedValues[`${-currentCounter}`] = services[serviceID];
                                    currentCounter++;
                                }
                                
                                setCounter(currentCounter);
                                props.onChange(updatedValues);
                            }}
                        />
                    </div>
                }
            </div>
            <div>
                Type in a Service Here
                <CreateService
                    onChange={(name, value) => {
                        props.onChange({...props.services, [`${-counter}`]: value});
                        setCounter(counter+1);
                    }}
                />
            </div>
        </div>
    )
}