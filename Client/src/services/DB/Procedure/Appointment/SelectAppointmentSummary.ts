import { Body, queryDB } from "../../queryDB";

export default async function SelectAppointmentSummary(body: Body) {
     const appointment = await queryDB(`appointment/${body.appointmentID}?type=Protected&role=Appointment`, {}, "GET");
    return appointment;
}