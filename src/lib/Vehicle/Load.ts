import { Makes } from "@/database/Export";
import { ModelYears } from "./Decoder";

export const loadMakes = async (): Promise<Array<[string, string]>> => {
    return (await Makes()).map(m => [m.Make, m.Make]);
}

export const loadModelYears = async (): Promise<Array<[number, string]>> => {
    return (await ModelYears()).map(y => [y, y.toString()]);
}