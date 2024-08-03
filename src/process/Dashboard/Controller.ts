'use client';
import { 
    DB_AllAppointmentLabels, 
    DB_AppointmentOverview 
} from "@/database/Types";

export interface ControllerStructure {
    All: {
        Appointments: Array<DB_AppointmentOverview>;
        Labels: DB_AllAppointmentLabels;
        Count: number;
    }
    Current: {
        Appointments: Array<DB_AppointmentOverview>;
        Page: number;
        Checked: Array<string>;
    }
    Loading: boolean;
    Loaded: boolean;
}

export const DefaultController: ControllerStructure = {
    All: {
        Appointments: [],
        Labels: {},
        Count: 0
    },
    Current: {
        Checked: [],
        Appointments: [],
        Page: 1
    },
    Loading: false,
    Loaded: false
};