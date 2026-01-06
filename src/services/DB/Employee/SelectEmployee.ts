import { request, Body } from "../request";

export default async function SelectEmployee() {
    const {output} = await request("GET", "/employee/select");
    return output;
}