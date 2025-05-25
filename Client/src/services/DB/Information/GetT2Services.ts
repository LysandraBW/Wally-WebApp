import { InfoService as DB_Service } from "waltronics-types";
import { request } from "../request";
import { Options } from "@/features/Form/DEF";

// Stores the Class, Division, and Service of a Defined Service
export type ServiceMap = {[serviceID: string]: DB_Service};

// Stores the Defined Services, Ordered by Class and Division
export type ServiceT2Pairs = {[serviceClass: string]: {[serviceDivision: string]: Options}};

// Stores the Flattened Services
export type ServiceFlat = Array<[string, string]>;

export async function GetT2Services() {
    const output = await request("GET", "/services");
    
    const serviceMap: ServiceMap = {};
    const serviceFlat: ServiceFlat = [];
    const serviceDeep: ServiceT2Pairs = {};

    for (const service of output) {
        const {Class, Division, Service, ServiceID} = service;
        serviceMap[ServiceID] = service;
        serviceFlat.push([ServiceID, Service]);
        if (ServiceID === 1)
            continue;
        if (!serviceDeep[Class])
            serviceDeep[Class] = {};
        if (!serviceDeep[Class][Division])
            serviceDeep[Class][Division] = [];
        serviceDeep[Class][Division].push([ServiceID.toString(), Service]);
    }

    return {
        deep: serviceDeep,
        map: serviceMap,
        flat: serviceFlat,
    };
}