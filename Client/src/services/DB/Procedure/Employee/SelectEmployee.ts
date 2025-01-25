import { queryDB, Body } from "../../queryDB";

export default async function SelectEmployee(body: Body) {
    const output = await queryDB("employee/select", {
        sessionID: body.sessionID
    });
    return output;
}