import { Services } from "@/database/Export";
import { DB_AppointmentService } from "@/database/Types";

// Stores the Class, Division, and Service of a Defined Service
export type ServiceType = {[k: string]: DB_AppointmentService};

// Stores all the Defined Services, Ordered by Class (k) and Division (j)
export type ServiceValuesType = {[k: string]: {[j: string]: Array<[number, string]>}};

export const loadLayeredServices = async () => {
    const serviceValues: ServiceValuesType = {};
    const services: ServiceType = {};

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

    return {
        serviceValues,
        services
    };
}

export const loadServices = async (): Promise<{ [k: string]: Array<[number, string]>; }> => {
    const services: { [k: string]: Array<[number, string]>; } = {};
    const dbServices = await Services();
    dbServices.forEach(service => {
        // 'Unknown' Option is Hard-Coded
        // It shouldn't be hardcoded, but for now. It's okay.
        if (service.ServiceID === 1)
            return;
        if (!services[service.Class])
            services[service.Class] = [];
        services[service.Class].push([service.ServiceID, service.Service]);
    });
    return services;
}