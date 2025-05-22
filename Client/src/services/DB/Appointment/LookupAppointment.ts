import { request, Body } from "../request";

export default async function LookupAppointment(body: Body) {
    try {
        const {output} = await request("POST", "/appointment/lookup", {email: body.email, appointmentID: body.appointmentID});
        if (!output)
            return null;
        
        return {
            sessionID: output,
            appointmentID: body.appointmentID
        };
    }
    catch (error) {
        console.error(error);
        return null;
    }
}