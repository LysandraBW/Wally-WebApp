import { Body, queryDB } from "../../queryDB";

export default async function DeleteAppointments(body: Body, permanent = true, multiple = true) {
    const URL = `appointment/${permanent ? "p" : "t"}Delete${multiple ? "Multiple" : ""}`;
    const output = await queryDB(URL, {
        sessionID: body.sessionID,
        appointmentID: body.appointmentID || null,
        appointmentIDs: body.appointmentIDs ? body.appointmentIDs.join(",") : null
    });
    return output;
}