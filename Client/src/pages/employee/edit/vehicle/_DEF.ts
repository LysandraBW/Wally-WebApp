import { z } from "zod";
import { Appointment as DB_Appointment } from "waltronics-types";
import { toString } from "@/utils/convert";
import { isVIN, subsetOf } from "@/lib/Zod/InputTest";

export interface Vehicle {
    VIN: string;
    Make: [string];
    Model: [string];
    Mileage: string;
    ModelYear: [string];
    LicensePlate: string;
}

export function makeVehicle(appointment: DB_Appointment): Vehicle {
    return {
        VIN: toString(appointment.VIN),
        Make: [appointment.Make],
        Model: [appointment.Model],
        Mileage: toString(appointment.Mileage),
        ModelYear: [toString(appointment.ModelYear)],
        LicensePlate: toString(appointment.LicensePlate),
    };
}

export function vehicleTest(makes: Array<string>, models: Array<string>, modelYears: Array<string>) { 
    return z.object({
        VIN: isVIN.or(z.literal("")),
        Make: subsetOf(makes),
        Model: subsetOf(models),
        ModelYear: subsetOf(modelYears),
        Mileage: z.string().optional(),
        LicensePlate: z.string().optional()
    }
)}

export interface VehicleUpdates {
    VIN: string | null;
    Make: string | null;
    Model: string | null;
    ModelYear: number | null;
    Mileage: number | null;
    LicensePlate: string | null;
}