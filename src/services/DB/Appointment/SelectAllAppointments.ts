import { request, Body } from "../request";

export default async function SelectAllAppointments(body: Body) {
    let url = "/appointments?";
    for (const entry of Object.entries(body)) {
        if (entry[1] === null)
            continue;
        url += `${entry[0]}=${entry[1]}&`
    }
    const {output} = await request("GET", url);
    
    return output;
}