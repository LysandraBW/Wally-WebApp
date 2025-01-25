import { Body, queryDB } from "../../queryDB";

export default async function LookupAppointment(body: Body) {
    try {
        const output = await queryDB("appointment/lookup", {
            email: body.email,
            appointmentID: body.appointmentID
        });
    
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