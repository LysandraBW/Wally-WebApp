import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectAllAppointments from "@/services/db/Appointment/SelectAllAppointments";
import { FilterManager } from "./useFilterManager";
import { AppointmentLabels, AppointmentsTable, AppointmentRow } from "waltronics-types";
import useInterval from "@/features/Alert/useInterval";
import { ToggleManager } from "./useToggleManager";
import UpdateAppointmentLabel from "@/services/db/Appointment/UpdateAppointmentLabel";

export interface Appointment extends AppointmentRow {Labels: AppointmentLabels}
export interface Appointments {[appointmentID: string]: Appointment}
export type AppointmentManager = ReturnType<typeof useAppointmentManager>;

export default function useAppointmentManager(filterManager: FilterManager, setLoadedTable: Dispatch<SetStateAction<{[k: string]: boolean}>>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [appointments, setAppointments] = useState<Array<Appointment>>([]);
    const [openedAppointment, setOpenedAppointment] = useState<string>();
    const [tableAppointments, setTableAppointments] = useState<Array<Appointment>>();


    useEffect(() => {
        const load = async () => {
            await loadAppointments();
            loadOpenedAppointment();
        }
        load();
    }, []);


    useEffect(() => {
        setLoadedTable(loadingTable => ({...loadingTable, "toggleManager": false}));
        loadAppointments();
    }, [filterManager.search, filterManager.statusID, filterManager.labelID]);


    useEffect(() => {
        if (!appointments)
            return;
        setAppointments(sortAppointments(appointments));
    }, [filterManager.columnDirections]);


    useEffect(() => {
        updateTableAppointments();
    }, [appointments, filterManager.pageIndex]);


    // Updates Appointments Every 5 Minutes
    useInterval(() => {
        loadAppointments(false);
    }, 1000 * 60 * 5);


    const formatAppointments = (appointments: AppointmentsTable) => {
        if (!appointments)
            return [];
        return appointments.Appointments;
    }

    const updateTableAppointments = () => {
        if (!appointments) {
            setTableAppointments([]);
            return;
        }
        const start = filterManager.pageIndex * filterManager.pageLength;
        const length = filterManager.pageLength;
        const appointmentSubset = appointments.slice(start, start + length);
        setTableAppointments(appointmentSubset);
    }


    const loadAppointments = async (resetPage: boolean = true) => {
        const filter = filterManager.filter();
        const appointments = await SelectAllAppointments(filter) as AppointmentsTable;
       
        setAppointments(sortAppointments(formatAppointments(appointments)));
        
        if (resetPage) {
            filterManager.setPageIndex(0);
            filterManager.updateMaxPageIndex(appointments.Count);
        }
    }


    const loadOpenedAppointment = () => {
        if (!searchParams)
            return;
        
        const apptID = searchParams.get("ApptID");
        if (apptID)
            openAppointment(apptID);
    }


    const openAppointment = (appointmentID: string) => {
        const URL = "/employee/home/dashboard?ApptID=" + appointmentID;
        router.replace(URL);
        setOpenedAppointment(appointmentID);
    }


    const closeAppointment = () => {
        const URL = "/employee/home/dashboard";
        router.replace(URL);
        setOpenedAppointment("");
    }


    const updateAppointmentLabel = (appointmentID: string, labels: AppointmentLabels) => {
        if (!tableAppointments)
            return;
        
        const index = tableAppointments.findIndex(app => app.AppointmentID === appointmentID);
        if (index === -1)
            throw "Appointment Not Found!";
        
        const updatedAppointments = [...tableAppointments];
        updatedAppointments[index] = {
            ...updatedAppointments[index],
            "Labels": labels
        }
        setTableAppointments(updatedAppointments);
    }


    const sortAppointments = (appointments: Array<AppointmentRow>) => {
        if (appointments.length === 0)
            return [];

        // Sort by Creation Date (Default)
        let sortedAppointments = [...appointments];
        sortedAppointments.sort((b, a) => {
            return new Date(a.CreationDate).getTime() - new Date(b.CreationDate).getTime();
        });

        // More Sorting
        for (const [column, direction] of Object.entries(filterManager.columnDirections)) {
            if (column === null || direction === null)
                continue;
            
            // The appointments with a null value for the column specified will
            // be placed at the end. We're exlcuding them so that we can do this.
            const appointmentsNull = [];
            const appointmentsNonNull = [];

            for (const appointment of sortedAppointments) {
                const value = (appointment as any)[`${column}`];
                if (value === null)
                    appointmentsNull.push(appointment);
                else
                    appointmentsNonNull.push(appointment);
            }

            // If there's no appointments to sort, we don't sort.
            if (!appointmentsNonNull)
                break;

            // Sort by Column, Must Check if Numeric or String Sort
            const isNumber = typeof (appointmentsNonNull[0] as any)[`${column}`] === "number";
            if (isNumber) {
                appointmentsNonNull.sort((a, b) => {
                    return (a as any)[`${column}`] - (b as any)[`${column}`];
                });
            }
            else {
                appointmentsNonNull.sort((a, b) => {
                    return ((a as any)[`${column}`] as string).localeCompare((b as any)[`${column}`] as string);
                });
            }
            
            // Reverse Direction
            if (direction === "0")
                appointmentsNonNull.reverse();
        
            sortedAppointments = [...appointmentsNonNull, ...appointmentsNull];
        }

        return sortedAppointments;
    }


    const goToNextAppointment = async () => {
        if (!openedAppointment)
            return;
        const appointmentIndex = appointments.findIndex(appt => appt.AppointmentID === openedAppointment);
        let nextAppointmentIndex = appointmentIndex + 1;
        if (nextAppointmentIndex >= appointments.length) {
            nextAppointmentIndex = 0;
        }
        setOpenedAppointment(appointments[nextAppointmentIndex].AppointmentID);

        if (!(await UpdateAppointmentLabel({
            labelID: 1, 
            labelValue: 1,
            appointmentID: appointments[nextAppointmentIndex].AppointmentID,
        })))
            return;
        
        updateAppointmentLabel(appointments[nextAppointmentIndex].AppointmentID, {
            ...appointments[nextAppointmentIndex].Labels,
            "Seen": {
                ...appointments[nextAppointmentIndex].Labels.Seen,
                "Value": 1
            }
        });
    }


    const goToPrevAppointment = async () => {
        if (!openedAppointment)
            return;
        const appointmentIndex = appointments.findIndex(appt => appt.AppointmentID === openedAppointment);
        let prevAppointmentIndex = appointmentIndex - 1;
        if (prevAppointmentIndex < 0) {
            prevAppointmentIndex = appointments.length - 1;
        }
        setOpenedAppointment(appointments[prevAppointmentIndex].AppointmentID);

        if (!(await UpdateAppointmentLabel({
            labelID: 1, 
            labelValue: 1,
            appointmentID: appointments[prevAppointmentIndex].AppointmentID,
        })))
            return;

        updateAppointmentLabel(appointments[prevAppointmentIndex].AppointmentID, {
            ...appointments[prevAppointmentIndex].Labels,
            "Seen": {
                ...appointments[prevAppointmentIndex].Labels.Seen,
                "Value": 1
            }
        });
    }


    return {
        appointments: tableAppointments,
        openedAppointment,
        openAppointment,
        closeAppointment,
        loadAppointments,
        updateAppointmentLabel,
        goToNextAppointment,
        goToPrevAppointment
    }
}