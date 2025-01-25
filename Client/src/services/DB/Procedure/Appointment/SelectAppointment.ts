import { Body, queryDB } from "../../queryDB";

export default async function SelectAppointment(body: Body) {
    const output = await queryDB("appointment/select", {
        sessionID: body.sessionID,
        appointmentID: body.appointmentID
    });
    return output;
}