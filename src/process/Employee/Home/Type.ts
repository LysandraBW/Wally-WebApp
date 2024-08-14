'use client';
import { 
    DB_AllAppointmentLabels, 
    DB_AppointmentOverview 
} from "@/database/Types";

export type AllType = {
    Count: number;
    Loading: boolean;
    Loaded: boolean;
    Labels: DB_AllAppointmentLabels;
    Appointments: Array<DB_AppointmentOverview>;
}

export type FilterType = {
    PageNumber: number;
    PageSize: number;
    [k: string]: any;
}

export type CurrentType = {
    Page: number;
    AppointmentID: string;
    Checked: Array<string>;
    Appointments: Array<DB_AppointmentOverview>;
}

export const InitialAll: AllType = {
    Appointments: [],
    Labels: {},
    Count: 0,
    Loaded: false,
    Loading: false
}

export const InitialCurrent: CurrentType = {
    Checked: [],
    Appointments: [],
    AppointmentID: '',
    Page: 1
}

export const InitialFilter: FilterType = {
    PageNumber: 1,
    PageSize: 5
}