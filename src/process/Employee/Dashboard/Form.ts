'use client';
import { DB_AppointmentOverview, DB_EmployeeLabels } from "@/lib/Database/Types";

export interface AppControllerStructure {
    all: Array<DB_AppointmentOverview>;
    allLabels: DB_EmployeeLabels
    allCount: number;

    current: Array<DB_AppointmentOverview>;
    currentPage: number;
    checked: Array<string>;

    open: DB_AppointmentOverview | null;
    loading: boolean;
    loaded: boolean;
}

export const AppController: AppControllerStructure = {
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

export interface FilterStructure {
    PageNumber: number;
    PageSize: number;
    LookAhead?: number;
    [k: string]: any;
}

export const Filter: FilterStructure = {
    PageNumber: 1,
    PageSize: 5
}