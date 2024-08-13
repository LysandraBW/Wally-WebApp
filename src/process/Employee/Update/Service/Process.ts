import { DB_Appointment, DB_AppointmentService } from "@/database/Types";
import { useEffect, useState } from "react";
import { InitialLoaded, LoadedType } from "./Load";
import { InitialServicesForm, ServicesFormStructure } from "@/submission/Employee/Update/Service/Form";
import { submitServicesForm } from "@/submission/Employee/Update/Service000/Service/Submit";

export default function useServicesForm(appointment: DB_Appointment) {
    const [loaded, setLoaded] = useState<LoadedType>();
    const [counter, setCounter] = useState(1);
    const [updated, setUpdated] = useState<ServicesFormStructure>();
    const [reference, setReference] = useState<ServicesFormStructure>();

    useEffect(() => {
        const load = async () => {
            setLoaded(await InitialLoaded());

            const servicesForm = await InitialServicesForm(appointment);
            setUpdated(servicesForm);
            setReference(servicesForm);
        }
        load();
    }, [appointment]);

    const deleteService = (serviceID: string): void => {
        if (!updated)
            return;

        let updatedServices = {...updated.Services};
        delete updatedServices[`${serviceID}`];
        setUpdated(Object.assign({}, updated, {Services: {...updated.Services, ...updatedServices}}));
    }

    const updateService = (serviceID: string, service: DB_AppointmentService) => {
        if (!updated)
            return;

        let updatedServices = {...updated.Services};
        updatedServices[`${serviceID}`] = service;
        setUpdated(Object.assign({}, updated, {Services: {...updated.Services, ...updatedServices}}));
    }

    const updateDefinedService = (services: Array<number>) => {
        if (!updated || !loaded)
            return;

        let updatedServices = {...updated.Services};

        // Removing Deleted Services
        Object.entries(updated.Services).forEach(([key, value]) => {
            const {ServiceID} = value;
            if (!ServiceID || services.includes(ServiceID))
                return;
            delete updatedServices[`${key}`];
        });

        // Adding New Services
        let updatedCounter = counter;
        const currentServiceIds = Object.values(updated.Services).map(s => s.ServiceID);
        services.forEach(serviceId => {
            if (currentServiceIds.includes(serviceId))
                return;

            updatedServices[`${-updatedCounter}`] = loaded.Flattened[`${serviceId}`];
            updatedCounter++;
        });

        setCounter(updatedCounter);
        setUpdated(Object.assign({}, updated, {Services: {...updated.Services, ...updatedServices}}));
    }

    const addService = (service: DB_AppointmentService) => {
        if (!updated)
            return;
        setUpdated(Object.assign({}, updated, {Services: {...updated.Services, service}}));
        setCounter(counter => counter + 1);
    }

    const resetData = async () => {
        setUpdated(reference);
    }

    const submitData = async () => {
        if (!reference || !updated)
            return;
        const output = await submitServicesForm(reference, updated);
        return output;
    }

    return {
        loaded,
        updated,
        deleteService,
        updateService,
        updateDefinedService,
        addService,
        resetData,
        submitData
    }
}