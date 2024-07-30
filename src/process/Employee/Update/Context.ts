import { DB_AppointmentLabels, DB_Employee, DB_GeneralEmployee } from "@/database/Types";

export interface ContextStructure {
    Employee: {
        SessionID:      string;
        Employee:       DB_Employee;
        Employees:      Array<DB_GeneralEmployee>;
    };
    Appointment: {
        AppointmentID:  string;
        Labels:         DB_AppointmentLabels;
    };
    Paused:         boolean;
    Loading:        boolean;
    Loaded:         boolean;
}

export const Context: ContextStructure = {
    Employee: {
        SessionID:      '',
        Employee: {
            EmployeeID: '',
            FName:      '',
            LName:      '',
            Email:      '',
            Phone:      ''
        },
        Employees:      [],
    },
    Appointment: {
        AppointmentID:  '',
        Labels:         {}
    },
    Paused:         true,
    Loading:        false,
    Loaded:         false,
};