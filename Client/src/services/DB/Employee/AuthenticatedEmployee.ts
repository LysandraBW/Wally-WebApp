import { request } from "@/services/DB/request";
import { DB_Employee } from "../../Interface/Employee";

export default async function AuthenticatedEmployee(): Promise<false|DB_Employee> {
    try {
        const {output} = await request("GET", "/employee");
        return output;
    }
    catch (err) {
        return false;
    }
}