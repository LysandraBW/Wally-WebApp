"use server";
import { DB_Make } from "@/services/DB/Interface/Information";
import { Options } from "@/features/Form/DEF";
import { fetchDB } from "../../fetchDB";

export default async function VehicleMakePairs(): Promise<Options> {
    const makes = await fetchDB("GET", "makes");
    return makes.map((make: DB_Make) => [make.Make, make.Make]);
}