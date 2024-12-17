'use server';
import { DataType } from "../../../submission/Employee/Login/Data";
import { AuthenticateLogin } from "@/db/export";
import { processData } from "../../../submission/Employee/Login/Process";
import { setSessionID } from "@/utils/cookie";

export type DataKeys = 'Username' | 'Password';

export interface DataType {
    Username: string;
    Password: string;
}

export const InitialData = async (): Promise<DataType> => {
    return {
        Username: "",
        Password: ""   
    }
}

import { DataType } from "../../../submission/Employee/Login/Data";

export interface ProcessedDataStructure {
    Username: string;
    Password: string;
}

export const processData = (data: DataType): ProcessedDataStructure => {
    return {
        Username: data.Username.trim(),
        Password: data.Password.trim()
    }
}

export const submit = async (data: DataType): Promise<string> => {
    const processedData = processData(data);   
    
    const sessionID = await AuthenticateLogin(processedData);
    if (!sessionID)
        return '';

    setSessionID(sessionID);
    return sessionID;
}