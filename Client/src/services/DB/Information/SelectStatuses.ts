import { DB_Status } from "../../Interface/Information";
import { request } from "../request";

export default async function SelectStatuses() {
    const output: Array<DB_Status> = await request("GET", "/statuses");
    return output;
}