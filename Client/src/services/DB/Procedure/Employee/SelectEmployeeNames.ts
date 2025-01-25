import { queryDB, Body } from "../../queryDB";

export default async function SelectEmployeeNames(body: Body) {
    const output = await queryDB("employee/selectNames", {
        sessionID: body.sessionID
    });
    return output;
}