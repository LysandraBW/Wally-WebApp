import { DB_Employee, DB_GeneralEmployee } from "@/database/Types";

export interface ContextStructure {
    SessionID:  string;
    Employee:   DB_Employee;
    Employees:  Array<DB_GeneralEmployee>;
}

export const Context: ContextStructure = {
    SessionID:      '',
    Employee:       {
        EmployeeID: '',
        FName: '',
        LName: '',
        Email: '',
        Phone: ''
    },
    Employees:      []
}