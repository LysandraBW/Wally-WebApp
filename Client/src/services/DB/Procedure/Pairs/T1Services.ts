import { Options } from "@/features/Form/DEF";
import { fetchDB } from "../../fetchDB";

// Stores the Defined Services, Ordered by Class and Division
export type ServiceT1Pairs = {[serviceClass: string]: Options};

export async function T1Services() {
    const output = await fetchDB("GET", "services");

    const servicesT1: {[serviceClass: string]: Options} = {};
    for (const service of output) {
        const {ServiceID, Class, Service} = service;
        if (ServiceID === 1)
            continue;
        if (!servicesT1[Class])
            servicesT1[Class] = [];
        servicesT1[Class].push([ServiceID.toString(), Service]);
    }
    return servicesT1;
};

export const t1Values = (values: ServiceT1Pairs) => {
    return Object.values(values).flat().map(s => s[0]);
};