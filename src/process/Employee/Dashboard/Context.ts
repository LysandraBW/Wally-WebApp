import { DB_Employee, DB_Label, DB_Status } from "@/database/Types";

export interface ContextStructure {
    Employee: {        
        SessionID:  string;
        Employee:   DB_Employee;
    };
    Categories: {
        Labels:     Array<DB_Label>;
        Statuses:   Array<DB_Status>;
    };
    Loaded:     boolean;
}

export const Context: ContextStructure = {
    Employee: {
        SessionID: '',
        Employee: {
            EmployeeID: '',
            FName:      '',
            LName:      '',
            Email:      '',
            Phone:      ''
        }
    },
    Categories: {
        Statuses:   [],
        Labels:     [],
    },
    Loaded:     false,
};