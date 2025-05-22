import { request, Body } from "../request";

export const ROLE_APPOINTMENT = "Appointment";
export const ROLE_EMPLOYEE = "Employee";

export default async function SelectProtectedAppointment(appointmentID: string, role: typeof ROLE_APPOINTMENT | typeof ROLE_EMPLOYEE) {
    const {output} = await request("GET", `/appointment/${appointmentID}?type=Protected&role=${role}`);
    return output;
}