import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectAllAppointments from "@/services/DB/Appointment/SelectAllAppointments";
import { FilterManager } from "./useFilterManager";
import { AppointmentLabels, AppointmentList, AppointmentEntry } from "waltronics-types";

export interface Appointment extends AppointmentEntry {Labels: AppointmentLabels}
export interface Appointments {[appointmentID: string]: Appointment}
export type AppointmentManager = ReturnType<typeof useAppointmentManager>;

export default function useAppointmentManager(filterManager: FilterManager, setLoadedTable: Dispatch<SetStateAction<{[k: string]: boolean}>>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [appointments, setAppointments] = useState<Array<Appointment>>();
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
    }, [filterManager.search, filterManager.statusID, filterManager.deleted]);

    useEffect(() => {
        if (!appointments || appointments.length === 0)
            return;
        // Sort by Creation Date (Default)
        const sortedAppointments = [...appointments];
        sortedAppointments.sort((b, a) => new Date(a.CreationDate).getTime() - new Date(b.CreationDate).getTime());

        // More Sorting
        for (const [column, direction] of Object.entries(filterManager.columnDirections)) {
            if (column === null || direction === null)
                continue;
            
            const isNumber = typeof (sortedAppointments[0] as any)[`${column}`] === "number";
            if (isNumber) {
                sortedAppointments.sort((a, b) => {
                    return (a as any)[`${column}`] - (b as any)[`${column}`];
                });
            }
            else {
                sortedAppointments.sort((a, b) => {
                    return ((a as any)[`${column}`] as string).localeCompare((b as any)[`${column}`] as string);
                });
            }
            
            if (direction === "0")
                sortedAppointments.reverse();
        }
        setAppointments(sortedAppointments);
    }, [filterManager.columnDirections]);

    useEffect(() => {
        updateTableAppointments();
    }, [appointments, filterManager.pageIndex]);

    const formatAppointments = (appointments: AppointmentList) => {
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

    const loadAppointments = async () => {
        const filter = filterManager.filter();
        const appointments = await SelectAllAppointments(filter) as AppointmentList;
        console.log(`Appointments: `, appointments);
        setAppointments(formatAppointments(appointments));
        filterManager.updateMaxPageIndex(appointments.Count);
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
        updatedAppointments[index].Labels = labels;
        setTableAppointments(updatedAppointments);
    }

    return {
        appointments: tableAppointments,
        openedAppointment,
        openAppointment,
        closeAppointment,
        loadAppointments,
        updateAppointmentLabel
    }
}