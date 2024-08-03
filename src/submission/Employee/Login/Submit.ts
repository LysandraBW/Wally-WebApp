'use server';
import { FormStructure } from "./Form";
import { AuthenticateLogin } from "@/database/Export";
import { processForm } from "./Process";
import { setSessionID } from "@/lib/Storage/Storage";

export const submitForm = async (form: FormStructure): Promise<string> => {
    const processedForm = processForm(form);
    
    const sessionID = await AuthenticateLogin(processedForm);
    if (!sessionID)
        return '';

    setSessionID(sessionID);
    return sessionID;
}