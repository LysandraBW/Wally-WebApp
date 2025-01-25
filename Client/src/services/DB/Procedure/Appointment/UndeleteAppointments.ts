import { Body, queryDB } from "../../queryDB";

export default async function UndeleteAppointments(body: Body) {
    const output = await queryDB("appointment/undeleteMultiple", {
        sessionID: body.sessionID,
        appointmentIDs: body.appointmentIDs.join(",")
    });
    return output;
}