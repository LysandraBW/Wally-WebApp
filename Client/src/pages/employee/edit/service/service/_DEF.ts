import { Define } from "@/features/ItemManager/Define";
import { DB_AppointmentService } from "@/services/DB/Interface/Appointment";
import { toString } from "@/utils/convert";
import { z } from "zod";
import { SERVICE } from "../../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";

export interface Service extends Omit<DB_AppointmentService, "AppointmentServiceID" | "ServiceID"> {
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

export class DefineService extends Define<DB_AppointmentService, Service, Services> {
    formID = SERVICE;
    itemID = "AppointmentServiceID";
    itemName = "Service";

    test(..._: any[]): FormTest {
        return z.object({
            Class: z.string(),
            Division: z.string(),
            Service: z.string()
        });
    }

    buildItem(baseItem: DB_AppointmentService | null): Service {
        return {
            AppointmentServiceID: toString(baseItem?.AppointmentServiceID),
            AppointmentID: toString(baseItem?.AppointmentID),
            Class: baseItem?.Class || "",
            Division: baseItem?.Division || "",
            Service: baseItem?.Service || "",
            ServiceID: toString(baseItem?.ServiceID),
        }
    }

    buildItems(baseItems: DB_AppointmentService[]): Services {
        const services: Services = {};
        for (const service of baseItems)
            services[service.AppointmentServiceID] = this.buildItem(service);
        return services;
    }
}