import { DB_Statuses } from "@/database/Info/Info";
import { DB_Status } from "@/database/Types";

export type Statuses = Array<[any, string]>;

export default async function loadStatuses(): Promise<Statuses> {
    let statuses: Array<DB_Status> = await DB_Statuses();
    return statuses.map(status => [status.StatusID, status.Status]);
}