import { queryDB, Body } from "../../queryDB";

export default async function AuthenticateEmployee(body: Body) {
    const output = await queryDB("employee/authenticate", {
        sessionID: body.sessionID
    });
    return output;
}