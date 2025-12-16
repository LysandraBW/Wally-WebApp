import { VehicleUpdates } from "@/app/employee/home/update/vehicle/_DEF";
import { request } from "../request";

export async function UpdateAppointmentVehicle(appointmentID: string, updates: VehicleUpdates) {
    try {
        request("POST", `/appointment/${appointmentID}/vehicle`, {
            make: updates.Make,
            model: updates.Model,
            modelYear: updates.ModelYear,
            vin: updates.VIN,
            mileage: updates.Mileage,
            licensePlate: updates.LicensePlate
        });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}