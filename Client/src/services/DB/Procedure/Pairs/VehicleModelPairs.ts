"use server";
import { DB_Make } from "@/services/DB/Interface/Information";
import { queryDB } from "../../queryDB";
import { Options } from "@/features/Form/DEF";

export default async function VehicleModelPairs(body: Body): Promise<Options> {
    const output = await queryDB("models", {});
    return output.map((make: DB_Make) => [make.Make, make.Make]);
}