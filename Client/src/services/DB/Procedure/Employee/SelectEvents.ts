import { queryDB, Body } from "../../queryDB";

export default async function SelectEvents(body: Body) {
    const output = await queryDB("employee/selectEvents", {
        sessionID: body.sessionID
    });
    return output;
}