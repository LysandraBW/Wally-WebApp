import { Define } from "@/features/ItemManager/Define";
import { toString } from "@/utils/convert";
import { z } from "zod";
import { SERVICE } from "../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";
import { Service as DB_Service, isClass, isDivision, isService } from "waltronics-types";

export interface Service extends Omit<DB_Service, "AppointmentServiceID" | "ServiceID"> {
    AppointmentServiceID: string;
    ServiceID: string;
};

export interface Services {
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

export class DefineService extends Define<DB_Service, Service, Services> {
    formID = SERVICE;
    itemID = "AppointmentServiceID";
    itemName = "Service";

    test(..._: any[]): FormTest {
        return z.object({
            AppointmentServiceID: z.string(),
            Class: isClass,
            Division: isDivision,
            Service: isService,
        });
    }

    buildItem(baseItem: DB_Service | null): Service {
        return {
            AppointmentServiceID: toString(baseItem?.AppointmentServiceID),
            AppointmentID: toString(baseItem?.AppointmentID),
            Class: baseItem?.Class || "",
            Division: baseItem?.Division || "",
            Service: baseItem?.Service || "",
            ServiceID: toString(baseItem?.ServiceID),
        }
    }

    buildItems(baseItems: DB_Service[]): Services {
        const services: Services = {};
        for (const service of baseItems)
            services[service.AppointmentServiceID] = this.buildItem(service);
        return services;
    }
}