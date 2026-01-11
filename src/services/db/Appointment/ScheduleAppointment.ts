import { capitalize } from "@/utils/convert";
import { request, Body } from "../request";

export default async function ScheduleAppointment(body: Body) {
    try {
        const {output} = await request("PUT", "/appointment", {
            fName: capitalize(body.fName.trim()),
            lName: capitalize(body.lName.trim()),
            email: body.email.trim(),
            phone: body.phone.trim(),
            vin: body.vin.trim(),
            make: body.make[0],
            model: body.model[0],
            modelYear: body.modelYear[0],
            services: body.services
        });

        // Returns the ID of the Created Appointment
        return output;
    }
    catch (error) {
        return "";
    }
};