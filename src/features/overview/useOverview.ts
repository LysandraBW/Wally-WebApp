import { useEffect, useReducer, useState } from "react";
import { FilterType, InitialAll, InitialCurrent, InitialFilter } from "./Type";
import AlertReducer, { AlertActionType, InitialAlert } from "@/hook/Alert/Reducer";
import { InitialPageContext } from "./Context";
import { getSessionID } from "@/utils/cookie";
import { goToEmployeeLogin } from "@/lib/navigation/navigation";
import { Delete, GetAppointments, GetEmployee, Restore } from "@/db/export";
import { DB_Labels, DB_Statuses } from "@/database/Info/Info";
import { deleteMessage, restoreMessage } from "./Helper";
import { MessageType } from "@/components/modal/Message";
import { DB_AllAppointmentLabels } from "@/database/interfaces";
import { useSearchParams } from "next/navigation";
import useInterval from "@/hooks/useTimer";

let ran = false;

export default function useDashboard() {
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);
    const [all, setAll] = useState(InitialAll);
    const [filter, setFilter] = useState(InitialFilter);
    const [current, setCurrent] = useState(InitialCurrent);
    const [context, setContext] = useState(InitialPageContext);
    const searchParameters = useSearchParams();

    useEffect(() => {
        if (ran) 
            return;
        ran = true;

        loadContext();
        const AppointmentID = searchParameters.get('AptID') || '';
        setCurrent(current => Object.assign({}, current, {AppointmentID}));
    }, []);

    useInterval(() => {
        alertDispatch({
            type: AlertActionType.RefreshMessages
        });
    }, 1000*1);

    useEffect(() => {
        if (!all.Loading && !all.Loaded)
            return;

        // Current Page
        const numberPages = Math.ceil(all.Count/filter.PageSize);
        const Page = Math.max(Math.min(current.Page, numberPages), 1);

        // Current Appointments
        const offset = (Page - 1) * filter.PageSize;
        const Appointments = all.Appointments.slice(offset, offset + filter.PageSize);

        // Current Checked Appointments
        const appointmentIDs = Appointments.map(app => app.AppointmentID);
        const Checked = current.Checked.filter(appointmentID => appointmentIDs.includes(appointmentID));

        setCurrent(current => Object.assign({}, current, {Page, Checked, Appointments}));
        setAll(all => Object.assign({}, all, {Loading: false, Loaded: true}));

    }, [all.Appointments.length, current.Page]);

    const loadContext = async () => {
        const SessionID = await getSessionID();
        if (!SessionID) {
            goToEmployeeLogin();
            return;
        }

        const Employee = await GetEmployee({ SessionID });
        if (!Employee)
            throw 'Employee Error';

        const Labels = await DB_Labels();
        if (!Labels.length)
            throw 'Label Error';

        const Statuses = await DB_Statuses();
        if (!Statuses.length)
            throw 'Status Error';

        setContext({
            Employee: {
                SessionID,
                Employee
            },
            Categories: {
                Labels,
                Statuses
            },
            Loaded: true
        });
        
        await loadAppointments(filter);
    }

    const loadAppointments = async (filter: FilterType) => {
        const Appointments = await GetAppointments({SessionID: context.Employee.SessionID, ...filter});
        if (!Appointments)
            throw 'Couldn\'t Get Appointments';

        setAll({
            ...Appointments,
            Loading: true,
            Loaded: false
        });

        setCurrent(InitialCurrent);
        setFilter(InitialFilter);
    }

    const deleteAppointments = async (appointmentIDs: Array<string>) => {
        const deletedAppointmentIDs: Array<string> = [];
        
        for (const appointmentID of appointmentIDs) {
            try {
                if (!(await Delete({
                    SessionID: context.Employee.SessionID,
                    AppointmentID: appointmentID
                })))
                    throw 'Failed to Delete Appointment';

                deletedAppointmentIDs.push(appointmentID);
            }
            catch (err) {
                break;
            }
        }

        // Lengths of Appointment IDs and Deleted Appointment IDs
        const lengthA = appointmentIDs.length;
        const lengthD = deletedAppointmentIDs.length;

        // Update Controller
        setAll(all => Object.assign({}, all, {
            Appointments: all.Appointments.filter(({AppointmentID}) => !deletedAppointmentIDs.includes(AppointmentID)),
            Count: all.Count - lengthD,
            Loading: true,
            Loaded: false
        }));

        // Show Message
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: deleteMessage(lengthA, lengthD),
                messageType: lengthA === lengthD ? MessageType.Success : MessageType.Error
            }
        });
    }

    const deleteAppointmentsHandler = async (appointmentIDs: Array<string>) => {
        // Putting Appointment into Recycling Bin
        // No Confirmation Message
        if (!filter.Deleted) {
            await deleteAppointments(appointmentIDs);
            return;
        }
     
        // Permanently Deleting Appointment
        // Confirmation Prompted
        alertDispatch({
            type: AlertActionType.AddConfirmation,
            addConfirmation: {
                message: 'This action permanently deletes the selected appointment(s). Are you sure you want to delete the selected appointment(s)?',
                agreeLabel: 'Delete Appointments',
                disagreeLabel: 'Cancel',
                onAgree: async () => {
                    alertDispatch({
                        type: AlertActionType.CloseConfirmation
                    });
                    deleteAppointments(appointmentIDs);
                },
                onDisagree: () => {
                    alertDispatch({
                        type: AlertActionType.CloseConfirmation
                    });
                }
            }
        });
    }

    const restoreAppointmentsHandler = async (appointmentIDs: Array<string>) => {
        const restoredAppointmentIDs: Array<string> = [];

        // Delete Appointments
        for (const appointmentID of appointmentIDs) {
            try {
                if (!(await Restore({
                    SessionID: context.Employee.SessionID, 
                    AppointmentID: appointmentID
                })))
                    throw 'Failed to Restore Appointment';
                restoredAppointmentIDs.push(appointmentID);
            }
            catch (err) {
                break;
            }
        }

        // Lengths of Appointment IDs and Deleted Appointment IDs
        const lengthA = appointmentIDs.length;
        const lengthD = restoredAppointmentIDs.length;

        // Update Controller
        setAll(all => Object.assign({}, all, {
            Appointments: all.Appointments.filter(({AppointmentID}) => !restoredAppointmentIDs.includes(AppointmentID)),
            Count: all.Count - lengthD,
            Loading: true,
            Loaded: false
        }));

        // Show Message
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: restoreMessage(lengthA, lengthD),
                messageType: lengthA === lengthD ?  MessageType.Success : MessageType.Error
            }
        });
    }

    const updateFilter = async (updatedFilters: {[k: string]: any}) => {
        const updatedFilter = Object.assign({}, filter, updatedFilters); 
        setFilter(updatedFilter);
        await loadAppointments(updatedFilter);
    }

    const updateChecked = async  (updatedChecked: Array<string>) => {
        setCurrent(current => Object.assign({}, current, {Checked: updatedChecked}));
    }

    const updateLabels = async (labels: DB_AllAppointmentLabels) => {
        setAll(all => Object.assign({}, all, {Labels: labels}));
    }

    const goForward = async () => {
        if (current.Page + 1 >= Math.ceil(all.Count/filter.PageSize))
            return;
        setCurrent(current => Object.assign({}, current, {Page: current.Page + 1}));
    }

    const goBackward = async () => {
        if (current.Page - 1 === 0)
            return;
        setCurrent(current => Object.assign({}, current, {Page: current.Page - 1}));
    }

    const openAppointment = async (aptId: string) => {
        setCurrent(current => Object.assign({}, current, {AppointmentID: aptId}));
    }

    const closeAppointment = async () => {
        setCurrent(current => Object.assign({}, current, {AppointmentID: ''}));
    }

    return {
        all,
        filter,
        current,
        context,
        alert,
        openAppointment,
        closeAppointment,
        loadAppointments,
        deleteAppointmentsHandler,
        restoreAppointmentsHandler,
        updateFilter,
        updateChecked,
        updateLabels,
        goForward,
        goBackward
    }
}

import { 
    DB_Employee, 
    DB_Label, 
    DB_Status 
} from "@/database/interfaces";
import { createContext } from "react";

export interface PageContextStructure {
    Employee: {        
        SessionID: string;
        Employee: DB_Employee;
    };
    Categories: {
        Labels: Array<DB_Label>;
        Statuses: Array<DB_Status>;
    };
    Loaded: boolean;
}

export const InitialPageContext: PageContextStructure = {
    Employee: {
        SessionID: '',
        Employee: {
            EmployeeID: '',
            FName: '',
            LName: '',
            Email: '',
            Phone: ''
        }
    },
    Categories: {
        Statuses: [],
        Labels: [],
    },
    Loaded: false,
};

export const PageContext = createContext(InitialPageContext);

'use client';
import { 
    DB_AllAppointmentLabels, 
    DB_AppointmentOverview 
} from "@/database/interfaces";

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

export function deleteMessage(aLength: number, dLength: number) {
    // All appointments deleted.
    if (aLength - dLength === 0) {
        if (aLength === 1)
            return 'Successfully Deleted Appointment';
        else
            return `Successfully Deleted Appointments`;
    }
    // An appointment was not deleted.
    else {
        if (aLength === 1)
            return 'Unsuccessfully Deleted Appointment';
        else
            return 'Unsuccessfully Deleted Appointments';
    }
}

export function restoreMessage(aLength: number, dLength: number) {
    // All appointments restored.
    if (aLength - dLength === 0) {
        if (aLength === 1)
            return 'Successfully Restored Appointment';
        else
            return `Successfully Restored Appointments`;
    }
    // An appointment was not restored.
    else {
        if (aLength === 1)
            return 'Unsuccessfully Restored Appointment';
        else
            return 'Unsuccessfully Restored Appointments';
    }
}

export function updateSortDirection(v: any) {
    if (v === 0) 
        return null;
    if (v === 1) 
        return 0;
    return 1;
}