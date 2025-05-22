import { request, Body } from "../../request";

export default async function SelectEmployee(body: Body) {
    const {output} = await request("GET", "/employee/select");
    return output;
}