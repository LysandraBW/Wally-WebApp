import { request, Body } from "../request";

export default async function SelectAppointment(body: Body) {
    const {output} = await request("GET", `appointment/${body.appointmentID}`);
    return output;
}