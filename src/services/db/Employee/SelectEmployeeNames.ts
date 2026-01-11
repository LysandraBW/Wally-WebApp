import { request, Body } from "../request";

export default async function SelectEmployeeNames() {
    const {output} = await request("GET", `/employee?type=Names&includeMe=${0}`);
    return output;
}