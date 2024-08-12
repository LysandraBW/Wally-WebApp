'use server';
import { DataType } from "./Data";
import { AuthenticateLogin } from "@/database/Export";
import { processData } from "./Process";
import { setSessionID } from "@/lib/Storage/Storage";

export const submit = async (data: DataType): Promise<string> => {
    const processedData = processData(data);   
    
    const sessionID = await AuthenticateLogin(processedData);
    if (!sessionID)
        return '';

    setSessionID(sessionID);
    return sessionID;
}