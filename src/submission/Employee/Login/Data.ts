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