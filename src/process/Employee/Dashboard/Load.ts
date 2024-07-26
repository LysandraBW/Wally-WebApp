import { DB_Employee, DB_Label, DB_Status } from "@/lib/Database/Types";

export function formatLabels(labels: Array<DB_Label>)
: {[labelName: string]: DB_Label} {
    const formattedLabels: {[labelName: string]: DB_Label} = {};
    for (const label of labels) {
        formattedLabels[label.Label] = label;
    }
    return formattedLabels;
}

export interface LoadedValues {
    employee: DB_Employee;
    statuses: Array<DB_Status>;
    labels: {[labelName: string]: DB_Label};
    loaded: boolean;
}

export const Values: LoadedValues = {
    employee: {
        EmployeeID: '',
        FName: '',
        LName: '',
        Email: '',
        Phone: ''
    },
    statuses:   [],
    labels:     {},
    loaded:     false
};