import { request, Body } from "../request";

export default async function SelectEmployeeNames() {
    const {output} = await request("GET", `/employee?type=Names&includeMe=${false}`);
    return output;
}