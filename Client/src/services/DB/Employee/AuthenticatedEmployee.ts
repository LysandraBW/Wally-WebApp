import { request } from "@/services/DB/request";
import { Employee as DB_Employee } from "waltronics-types";

export default async function AuthenticatedEmployee(): Promise<false|DB_Employee> {
    try {
        const {output} = await request("GET", "/employee");
        return output;
    }
    catch (err) {
        return false;
    }
}