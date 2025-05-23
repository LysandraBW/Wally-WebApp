import { request } from "../request";

export const DELETE_PERMANENT = "Permanent";
export const DELETE_TEMPORARY = "Temporary";

export default async function DeleteAppointments(appointmentIDs: Array<string>, type: typeof DELETE_PERMANENT | typeof DELETE_TEMPORARY) {
    const URL = `/appointment?type=${type}&size=Multiple`;
    console.log(appointmentIDs);
    const output = await request("DELETE", URL, {appointmentIDs});
    console.log(output);
    return output;
}