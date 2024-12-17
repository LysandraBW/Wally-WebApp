import { Makes } from "@/db/export";
import { ModelYears } from "../lib/decodeVIN";
import { Services } from "@/db/export";
import { DB_AppointmentService } from "@/database/interfaces";

import { DB_Statuses } from "@/database/Info/Info";
import { DB_Status } from "@/database/interfaces";

export const loadMakes = async (): Promise<Array<[string, string]>> => {
    return (await Makes()).map(m => [m.Make, m.Make]);
}

export const loadModelYears = async (): Promise<Array<[number, string]>> => {
    return (await ModelYears()).map(y => [y, y.toString()]);
}

// Stores the Class, Division, and Service of a Defined Service
export type FlattenedServices = {[k: string]: DB_AppointmentService};

// Stores all the Defined Services, Ordered by Class (k) and Division (j)
export type LayeredServices = {[k: string]: {[j: string]: Array<[number, string]>}};

export const loadLayeredServices = async () => {
    const layered: LayeredServices = {};
    const flattened: FlattenedServices = {};

    const dbServices = await Services();
    dbServices.forEach(service => {
        flattened[service.ServiceID] = {
            ...service, 
            AppointmentID: '', 
            AppointmentServiceID: 0
        };

        if (service.ServiceID === 1)
            return;

        if (!layered[service.Class])
            layered[service.Class] = {};
        if (!layered[service.Class][service.Division])
            layered[service.Class][service.Division] = [];
        layered[service.Class][service.Division].push([service.ServiceID, service.Service]);
    });

    return {
        layered,
        flattened
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

export type Statuses = Array<[any, string]>;

export default async function loadStatuses(): Promise<Statuses> {
    let statuses: Array<DB_Status> = await DB_Statuses();
    return statuses.map(status => [status.StatusID, status.Status]);
}

export const flattenValues = (values: { [k: string]: Array<[number, string]>; }) => {
    return Object.values(values).flat().map(s => s[0]);
}