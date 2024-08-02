import { Makes, Services } from "@/database/Export";
import { ModelYears } from "./Decoder";

export const loadMakes = async (): Promise<Array<[string, string]>> => {
    return (await Makes()).map(m => [m.Make, m.Make]);
}

export const loadModelYears = async (): Promise<Array<[number, string]>> => {
    return (await ModelYears()).map(y => [y, y.toString()]);
}

export const loadServices = async (): Promise<{[k: string]: Array<[number, string]>}> => {
    const services: {[k: string]: Array<[number, string]>} = {};
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

export const getValues = (values: Array<[any, string]>) => {
    return values.map(m => m[0]);
}

export const getServiceValues = (values: {[k: string]: Array<[number, string]>}) => {
    return Object.values(values).flat().map(s => s[0]);
}