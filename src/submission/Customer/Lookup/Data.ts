export type DataKeys = 'Email' | 'AppointmentID';

export interface DataType {
    Email: string;
    AppointmentID: string;
}

export const InitialData = async (): Promise<DataType> => {
    return {
        Email: "",
        AppointmentID: ""
    }
}