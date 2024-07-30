'use client';
import { DB_AllAppointmentLabels, DB_AppointmentOverview } from "@/database/Types";

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
    Open: string;
    Loading: boolean;
    Loaded: boolean;
}

export const Controller: ControllerStructure = {
    All: {
        Appointments:   [],
        Labels:         {},
        Count:          0
    },
    Current: {
        Checked:        [],
        Appointments:   [],
        Page:           1
    },
    Open:       '',
    Loading:    false,
    Loaded:     false
};