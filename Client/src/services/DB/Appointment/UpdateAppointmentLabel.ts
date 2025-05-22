import { request, Body } from "../request";


export default async function UpdateAppointmentLabel(body: Body) {
    const output = await request("POST", `/appointment/${body.appointmentID}/label`, {
        labelID: body.labelID,
        labelValue: body.labelValue
    });
    return output;
}