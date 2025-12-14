import { toString } from "@/utils/convert";
import { z } from "zod";
import { SERVICE } from "../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";
import { Service as DB_Service } from "waltronics-types";
import { Define } from "../Define";

export interface Service extends Omit<DB_Service, "AppointmentServiceID" | "ServiceID"> {
    AppointmentServiceID: string;
    ServiceID: string;
};

export interface MappedServices {
    [serviceID: string]: Service;
};

export interface ServiceUpdates {
    Update: Array<{
        AppointmentServiceID: number;
        Service: string | null;
        Division: string | null;
        Class: string | null;
    }>;
    Insert: Array<{
        Service: string;
        Division: string;
        Class: string;
    }>;
    Delete: Array<{
        AppointmentServiceID: number;
    }>;
}

export class DefineService extends Define<DB_Service, Service, MappedServices> {
    key = SERVICE;
    thingName = "Service";
    thingIDName = "AppointmentServiceID";

    thingTest(..._: any[]): FormTest {
        return z.object({
            Class: z.string(),
            Division: z.string(),
            Service: z.string()
        });
    }

    processBaseThing(baseThing: DB_Service | null): Service {
        return {
            AppointmentServiceID: toString(baseThing?.AppointmentServiceID),
            AppointmentID: toString(baseThing?.AppointmentID),
            Class: baseThing?.Class || "",
            Division: baseThing?.Division || "",
            Service: baseThing?.Service || "",
            ServiceID: toString(baseThing?.ServiceID),
        }
    }

    processBaseThings(baseThings: DB_Service[]): MappedServices {
        const services: MappedServices = {};
        for (const service of baseThings)
            services[service.AppointmentServiceID] = this.processBaseThing(service);
        return services;
    }
}