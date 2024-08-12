import { DB_Employee, DB_GeneralEmployee } from "@/database/Types";

export interface PageContextStructure {
    SessionID: string;
    Employee: DB_Employee;
    Employees: Array<DB_GeneralEmployee>;
}

export const DefaultPageContext: PageContextStructure = {
    SessionID: '',
    Employee: {
        EmployeeID: '',
        FName: '',
        LName: '',
        Email: '',
        Phone: ''
    },
    Employees: []
}