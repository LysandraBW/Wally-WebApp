import { DataType } from "./Data";

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