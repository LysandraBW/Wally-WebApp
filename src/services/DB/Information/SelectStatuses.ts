import { InfoStatus as DB_Status } from "waltronics-types";
import { request } from "../request";

export default async function SelectStatuses() {
    const output: Array<DB_Status> = await request("GET", "/statuses");
    return output;
}