import { capitalize } from "@/utils/capitalize";
import { request, Body } from "../request";

export default async function ScheduleAppointment(body: Body) {
    console.log("Body")
    console.log(body)
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
        console.log("OUTPUT")
        console.log(output)
        // Returns the ID of the Created Appointment
        return output;
    }
    catch (error) {
        console.log(error);
        return "";
    }
};