import { Body, queryDB } from "../../queryDB";

export default async function UpdateAppointmentLabel(body: Body) {
    const output = await queryDB("appointment/updateLabel", {
        sessionID: body.sessionID,
        appointmentID: body.appointmentID,
        labelID: body.labelID
    });
    return output;
}