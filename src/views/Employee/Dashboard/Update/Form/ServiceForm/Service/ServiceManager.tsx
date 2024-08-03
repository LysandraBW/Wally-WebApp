import { DB_AppointmentService } from "@/database/Types";
import { useEffect, useState } from "react";
import UpdateService from "./UpdateService";
import { CheckboxLayered } from "@/components/Input/Export";
import CreateService from "./CreateService";
import { loadLayeredServices, ServiceType, ServiceValuesType } from "@/lib/Service/Load";

interface ServiceManagerProps {
    services: {[serviceID: string]: DB_AppointmentService};
    updateFormState: (state: boolean) => void;
    onChange: (updatedValue: {[serviceID: string]: DB_AppointmentService}) => void;
}

export default function ServiceManager(props: ServiceManagerProps) {
    const [services, setServices] = useState<ServiceType>();
    const [serviceValues, setServiceValues] = useState<ServiceValuesType>();
    const [counter, setCounter] = useState<number>(1);

    useEffect(() => {
        const load = async () => {
            const {services, serviceValues} = await loadLayeredServices();
            setServices(services);
            setServiceValues(serviceValues);
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
                                updatedValue[`${serviceID}`] = service;
                                props.onChange(updatedValue);
                            }}
                            updateFormState={props.updateFormState}
                        />
                    </div>
                ))}
            </div>
            <div>
                {serviceValues && services &&
                    <div>
                        <CheckboxLayered
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