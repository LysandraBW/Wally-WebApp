import SelectEmployeeNames from "./SelectEmployeeNames";
import { EmployeeName as DB_EmployeeName } from "waltronics-types";
import { Options } from "@/features/Form/DEF";

export default async function GetEmployeeNamePairs(): Promise<Options> {
    const output = await SelectEmployeeNames();
    return output.map((employee: DB_EmployeeName) => [employee.EmployeeID, employee.FName + " " + employee.LName]);
}