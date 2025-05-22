import SelectEmployeeNames from "./SelectEmployeeNames";
import { DB_EmployeeName } from "../../Interface/Employee";
import { Options } from "@/features/Form/DEF";

export default async function GetEmployeeNamePairs(sessionID: string): Promise<Options> {
    const output = await SelectEmployeeNames();
    return output.map((employee: DB_EmployeeName) => [employee.EmployeeID, employee.Name]);
}