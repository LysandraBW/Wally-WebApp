import { DB_Event } from "@/database/Types";

export interface UpdateEvent extends DB_Event {
    UpdatedEvent: string;
    Sharees: Array<string>;
}

export interface EventsFormStructure {
    EmployeeID: string;
    Events: {[eventID: string]: UpdateEvent}
}

export interface UpdateStructure {
    Events: EventsFormStructure
}

export interface UpdateFormStructure {
    current:    UpdateStructure;
    reference:  UpdateStructure;
}

export const InitialUpdateForm: UpdateFormStructure = {
    current: {
        Events: {
            EmployeeID: '',
            Events: {}
        }
    },
    reference: {
        Events: {
            EmployeeID: '',
            Events: {}
        }
    }
}