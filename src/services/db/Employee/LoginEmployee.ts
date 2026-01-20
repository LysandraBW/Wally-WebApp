import { request, Body } from "../request";

export async function LoginEmployee(body: Body) {
    try {
        const response = await request("POST", "/employee/login", {
            username: body.username,
            password: body.password
        });
        return response.status === 200 ? response.output : "";
    }
    catch (err) {
        return "";
    }
}