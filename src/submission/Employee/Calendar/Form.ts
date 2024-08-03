import { DB_Event } from "@/database/Types";

export interface UpdateEvent extends DB_Event {
    UpdatedDate: string;
    Sharees: Array<string>;
}

export interface EventsStructure {
    [eventID: string]: UpdateEvent;
}

export interface EventsFormStructure {
    EmployeeID: string;
    Events: EventsStructure;
}

export interface UpdateFormStructure {
    current:    EventsFormStructure;
    reference:  EventsFormStructure;
}

export const InitialUpdateForm: UpdateFormStructure = {
    current: {
        EmployeeID: '',
        Events: {}
    },
    reference: {
        EmployeeID: '',
        Events: {}
    }
}