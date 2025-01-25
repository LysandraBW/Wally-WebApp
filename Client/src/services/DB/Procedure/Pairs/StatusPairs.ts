"use server";
import { queryDB } from "../../queryDB";
import { DB_Status } from "@/services/DB/Interface/Information";
import { Options } from "@/features/Inputs/ValueLabelPairs";

export default async function StatusPairs(): Promise<Options> {
    const output = await queryDB("info/status", {}, "GET");
    return output.map((status: DB_Status) => [status.StatusID.toString(), status.Status]);
}