import { DB_GeneralEmployee } from "@/database/Types";
import { PageContextStructure } from "../Context";
import { UpdateEvent } from "@/submission/Employee/Calendar/Form";

export interface EventContextStructure {
    isEventOwner: boolean;
    eventOwner: {
        name: string;
        employee: DB_GeneralEmployee;
    }
    eventSharees: Array<[string, string]>;
};

export const DefaultEventContext: EventContextStructure = {
    isEventOwner: false,
    eventOwner: {
        name: '',
        employee: {
            EmployeeID: '',
            FName: '',
            LName: ''
        }
    },
    eventSharees: []
}

export const loadEventContext = (context: PageContextStructure, event: UpdateEvent): EventContextStructure => {
    const owner = context.Employees.find(e => e.EmployeeID === event.EmployeeID);
    if (!owner)
        throw 'Cannot Find Event Owner';

    const ownerName = `${owner.FName} ${owner.LName}`;
    const isEventOwner = owner.EmployeeID === context.Employee.EmployeeID;
    const eventSharees = context.Employees.filter(e => (
        e.EmployeeID !== owner.EmployeeID
    )).map(e => [e.EmployeeID, `${e.FName} ${e.LName}`]) as Array<[string, string]>;

    return {
        isEventOwner,
        eventOwner: {
            employee: owner,
            name: ownerName
        },
        eventSharees: eventSharees
    };
}