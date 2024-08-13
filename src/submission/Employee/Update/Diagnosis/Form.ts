import { DB_Appointment, DB_Diagnosis } from "@/database/Types";

export type DataKeys = 'Code' | 'Message';

export interface DiagnosesStructure {
    [diagnosisID: string]: DB_Diagnosis;
}

export interface DiagnosesFormStructure {
    AppointmentID:  string;
    Diagnoses:      DiagnosesStructure;
}

export const InitialDiagnosesForm = async (appointment: DB_Appointment): Promise<DiagnosesFormStructure> => {
    const diagnoses: DiagnosesStructure = {};
    for (const diagnosis of appointment.Diagnoses)
        diagnoses[diagnosis.DiagnosisID] = diagnosis;

    return {
        AppointmentID:  appointment.AppointmentID,
        Diagnoses:      diagnoses
    };
}