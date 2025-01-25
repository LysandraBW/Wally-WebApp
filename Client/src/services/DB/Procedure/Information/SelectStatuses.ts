import { DB_Status } from "../../Interface/Information";
import { queryDB } from "../../queryDB";

export default async function SelectStatuses() {
    const output: Array<DB_Status> = await queryDB("info/status", {}, "GET");
    return output;
}