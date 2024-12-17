import { DB_Appointment } from "@/database/interfaces";

export type DataKeys = 'Make' | 'Model' | 'ModelYear' | 'VIN' | 'Mileage' | 'LicensePlate';

export interface VehicleFormStructure {
    AppointmentID:  string;
    Make:           string;
    Model:          string;
    ModelYear:      number;
    VIN:            string;
    Mileage:        number;
    LicensePlate:   string;
}

export const InitialVehicleForm = async (appointment: DB_Appointment): Promise<VehicleFormStructure> => {
    return {
        AppointmentID:  appointment.AppointmentID,
        Make:           appointment.Make,
        Model:          appointment.Model,
        ModelYear:      appointment.ModelYear,
        VIN:            appointment.VIN,
        Mileage:        appointment.Mileage,
        LicensePlate:   appointment.LicensePlate
    };
}