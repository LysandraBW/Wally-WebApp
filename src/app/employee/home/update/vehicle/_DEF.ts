import { z } from "zod";
import { Appointment as DB_Appointment, isEmptyString, isInteger, isVIN } from "waltronics-types";
import { toString } from "@/utils/convert";
import { subsetOf } from "@/utils/validate";

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
        Mileage: z.union([
            isEmptyString(),
            isInteger
        ]),
        LicensePlate: z.string().optional().or(z.literal(""))
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