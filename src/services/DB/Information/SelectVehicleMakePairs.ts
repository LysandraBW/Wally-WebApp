"use server";
import { InfoMake as DB_Make } from "waltronics-types";
import { Options } from "@/features/Form/DEF";
import { request } from "../request";

export default async function VehicleMakePairs(): Promise<Options> {
    const makes = await request("GET", "/makes");
    return makes.map((make: DB_Make) => [make.Make, make.Make]);
}