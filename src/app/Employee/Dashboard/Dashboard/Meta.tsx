'use client';
import { QuickAppointment } from "@/lib/Database/Appointment/Appointment";
import { Employee } from "@/lib/Database/Employee/Employee";
import { Status, Label } from "@/lib/Database/Info/Info";


export interface Apps {
    all: Array<QuickAppointment>;
    allLabels: { [appID: string]: { [label: string]: number; }; };
    allCount: number;

    current: Array<QuickAppointment>;
    currentPage: number;
    checked: Array<string>;

    loading: boolean;
    loaded: boolean;

    open: QuickAppointment | null;
}
export const defaultApps: Apps = {
    all: [],
    allLabels: {},
    allCount: 0,
    current: [],
    currentPage: 1,
    checked: [],
    loading: false,
    loaded: false,
    open: null
};

export interface Filter {
    PageNumber: number;
    PageSize: number;
    LookAhead?: number;
    [k: string]: any;
}
export interface Meta {
    employee: Employee;
    statuses: Array<Status>;
    labels: { [labelName: string]: Label; };
    loaded: boolean;
}
export const defaultMeta: Meta = {
    employee: {
        SessionID: '',
        FName: '',
        LName: '',
        Email: '',
        Phone: ''
    },
    statuses: [],
    labels: {},
    loaded: false
};
