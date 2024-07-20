'use server';
import { FormStructure } from "./Form";
import { AuthenticateLogin, GetEmployee } from "@/lib/Database/Export";
import { processForm } from "./Process";
import { Employee } from "@/lib/Database/Employee/Employee";
import { setToken } from "@/lib/Authorize/Authorize";
import { EmployeeToken } from "@/lib/Authorize/Employee";
import { User } from "@/lib/Database/Pool";
import { encrypt } from "@/lib/Hash/Hash";

export const submitForm = async (form: FormStructure)
: Promise<number> => {
    const processedForm = processForm(form);
    console.log('Peso')
    const employeeID = await AuthenticateLogin(processedForm, User.Employee);
    console.log(12)
    // Invalid Login
    if (!employeeID)
        return employeeID;

    // Unable to Get Data
    console.log('Pluma')
    const employeeData: Employee | null = await GetEmployee({EmployeeID: employeeID});
    if (!employeeData)
        return 0;
    console.log(13)
    // Payload
    // Not completely sure if this is how you're
    // supposed to use JWT tokens.
    const employeeToken: EmployeeToken = {
        ...employeeData, 
        'Username': await encrypt(processedForm.Username),
        'Password': await encrypt(processedForm.Password)
    }
    console.log('dominos', employeeToken);

    // Set JWT Token
    setToken(employeeToken);
    return employeeID;
}