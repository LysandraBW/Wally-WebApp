import { request, Body } from "../request";

export async function LoginEmployee(body: Body) {
    try {
        const {output} = await request("POST", "/employee/login", {
            username: body.username,
            password: body.password
        });
        return output || "";
    }
    catch (err) {
        // console.log("!!!");
        return "";
    }
}