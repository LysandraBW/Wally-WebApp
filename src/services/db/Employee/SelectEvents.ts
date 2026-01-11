import { request, Body } from "../request";

export default async function SelectEvents() {
    const {output} = await request("GET", "/employee/events");
    return output;
}