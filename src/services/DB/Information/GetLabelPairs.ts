"use server";
import { Options } from "@/features/Form/DEF";
import { InfoStatus as DB_Status } from "waltronics-types";
import { request } from "../request";

export default async function GetLabelPairs(): Promise<Options> {
    const {output} = await request("GET", "/labels");
    return output.map((status: DB_Status) => [status.StatusID.toString(), status.Status]);
}