"use server";
import { DB_Make } from "@/services/DB/Interface/Information";
import { Options } from "@/features/Inputs/ValueLabelPairs";
import { queryDB } from "../../queryDB";

export default async function VehicleMakePairs(): Promise<Options> {
    const output = await queryDB("info/make", {}, "GET");
    return output.map((make: DB_Make) => [make.Make, make.Make]);
}