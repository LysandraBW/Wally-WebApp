import { 
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
        AppointmentID: '',
        Labels: {}
    },
    Paused: true,
    Loaded: false,
};