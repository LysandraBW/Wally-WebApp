"use server";
import { DB_Make } from "@/services/DB/Interface/Information";
import { Options } from "@/features/Inputs/ValueLabelPairs";
import { queryDB } from "../../queryDB";

export default async function VehicleModelPairs(body: Body): Promise<Options> {
    const output = await queryDB("info/make", {});
    return output.map((make: DB_Make) => [make.Make, make.Make]);
}