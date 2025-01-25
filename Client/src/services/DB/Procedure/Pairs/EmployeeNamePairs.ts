import { Options } from "@/features/Inputs/ValueLabelPairs";
import SelectEmployeeNames from "../Employee/SelectEmployeeNames";
import { DB_EmployeeName } from "../../Interface/Employee";

export default async function EmployeeNamePairs(sessionID: string): Promise<Options> {
    const output = await SelectEmployeeNames({sessionID});
    return output.map((employee: DB_EmployeeName) => [employee.EmployeeID, employee.Name]);
}