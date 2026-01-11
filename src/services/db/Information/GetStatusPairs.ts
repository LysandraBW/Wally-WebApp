"use server";
import { Options } from "@/features/Form/DEF";
import { InfoStatus as DB_Status } from "waltronics-types";
import { request } from "../request";

export default async function GetStatusPairs(): Promise<Options> {
    const {output} = await request("GET", "/statuses");
    return output.map((status: DB_Status) => [status.StatusID.toString(), status.Status]);
}