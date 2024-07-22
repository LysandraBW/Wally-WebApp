'use server';
import { FormStructure } from "./Form";
import { AuthenticateLogin } from "@/lib/Database/Export";
import { processForm } from "./Process";
import { setToken } from "@/lib/Authorize/Authorize";

export const submitForm = async (form: FormStructure): Promise<string> => {
    const processedForm = processForm(form);
    const sessionID = await AuthenticateLogin(processedForm);

    // Invalid Login
    if (!sessionID)
        return '';

    // Set JWT Token
    setToken(sessionID);
    return sessionID;
}