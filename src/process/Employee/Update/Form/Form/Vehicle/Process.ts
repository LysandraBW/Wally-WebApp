import { updatedValue } from "../../Helper";
import { VehicleFormStructure } from "./Vehicle";

export interface ProcessedVehicleFormStructure {
    AppointmentID: string;
    VIN:        string | null;
    Make:       string | null;
    Model:      string | null;
    ModelYear:  number | null;
    Mileage:    number | null;
    LicensePlate: string | null;
}

export async function processVehicleForm(reference: VehicleFormStructure, current: VehicleFormStructure): Promise<ProcessedVehicleFormStructure> {
    return {
        AppointmentID:  current.AppointmentID,
        VIN:            updatedValue(reference.VIN, current.VIN),
        Make:           updatedValue(reference.Make, current.Make),
        Model:          updatedValue(reference.Model, current.Model),
        ModelYear:      updatedValue(reference.ModelYear, current.ModelYear),
        Mileage:        updatedValue(reference.Mileage, current.Mileage),
        LicensePlate:   updatedValue(reference.LicensePlate, current.LicensePlate)
    }
}
