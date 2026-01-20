import { request, Body } from "../request";

export default async function LookupAppointment(body: Body) {
    try {
        const response = await request("POST", "/appointment/lookup", {email: body.email, appointmentID: body.appointmentID});

        if (response.status === 400)
            return null;
        
        return {
            sessionID: response as unknown as string,
            appointmentID: body.appointmentID
        };
    }
    catch (error) {
        console.error(error);
        return null;
    }
}