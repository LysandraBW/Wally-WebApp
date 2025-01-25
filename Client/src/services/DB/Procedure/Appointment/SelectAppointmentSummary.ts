import { Body, queryDB } from "../../queryDB";

export default async function SelectAppointmentSummary(body: Body) {
    const output = await queryDB("appointment/selectSummary", {
        sessionID: body.sessionID,
        appointmentID: body.appointmentID
    });
    return output;
}