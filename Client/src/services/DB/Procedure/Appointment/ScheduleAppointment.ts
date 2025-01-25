import { capitalize } from "@/utils/format/capitalize";
import { Body, queryDB } from "../../queryDB";

export default async function ScheduleAppointment(body: Body) {
    try {
        const appointmentID = await queryDB("appointment/schedule", {
            fName: capitalize(body.fName.trim()),
            lName: capitalize(body.lName.trim()),
            email: body.email.trim(),
            phone: body.phone.trim(),
            vin: body.vin.trim(),
            make: body.make[0],
            model: body.model[0],
            modelYear: body.modelYear[0],
            services: body.services.join(",")
        });
        return appointmentID;
    }
    catch (error) {
        console.log(error);
        return "";
    }
};