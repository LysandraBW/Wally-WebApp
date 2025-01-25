import { queryDB, Body } from "../../queryDB";

export async function LoginEmployee(body: Body) {
    const output = await queryDB("employee/login", {
        username: body.username,
        password: body.password
    });
    return output;
}