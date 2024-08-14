import { 
    DB_Appointment,
    DB_AppointmentLabels, 
    DB_Employee, 
    DB_GeneralEmployee 
} from "@/database/Types";

export interface PageContextStructure {
    Employee: {
        SessionID: string;
        Employee: DB_Employee;
    };
    Employees: Array<DB_GeneralEmployee>;
    Appointment: {
        Appointment: DB_Appointment | null;
        AppointmentID: string;
        Labels: DB_AppointmentLabels;
    };
    Paused: boolean;
    Loaded: boolean;
};

export const DefaultPageContext: PageContextStructure = {
    Employee: {
        SessionID: '',
        Employee: {
            EmployeeID: '',
            FName: '',
            LName: '',
            Email: '',
            Phone: ''
        }
    },
    Employees: [],
    Appointment: {
        Appointment: null,
        AppointmentID: '',
        Labels: {}
    },
    Paused: true,
    Loaded: false,
};