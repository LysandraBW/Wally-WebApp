import { queryDB } from "../../queryDB";
import { VehicleUpdates } from "@/pages/employee/edit/vehicle/_DEF";

export async function UpdateAppointmentVehicle(sessionID: string, appointmentID: string, updates: VehicleUpdates) {
    try {
        queryDB("appointment/updateVehicle", {
            sessionID,
            appointmentID,
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