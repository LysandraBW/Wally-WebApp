import { request, Body } from "../request";

export async function LogoutEmployee() {
    try {
        const response = await request("POST", "/employee/logout");
        return response.status === 200 ? response.output : "";
    }
    catch (err) {
        return "";
    }
}