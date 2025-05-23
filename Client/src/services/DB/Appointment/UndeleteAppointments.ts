import { request, Body } from "../request";

export default async function RecoverAppointments(body: Body) {
    const {output} = await request("DELETE", "/appointment?size=Multiple&type=Recover", {
        appointmentIDs: body.appointmentIDs
    });
    return output;
}