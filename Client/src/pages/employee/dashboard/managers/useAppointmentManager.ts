import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectAllAppointments from "@/services/DB/Procedure/Appointment/SelectAllAppointments";
import { DB_AppointmentOverview, DB_AppointmentOverviews, DB_SingleAppointmentLabel } from "@/services/DB/Interface/Appointment";
import { FilterManager } from "./useFilterManager";

export interface Appointment extends DB_AppointmentOverview {Labels: DB_SingleAppointmentLabel}
export interface Appointments {[appointmentID: string]: Appointment}
export type AppointmentManager = ReturnType<typeof useAppointmentManager>;

export default function useAppointmentManager(sessionID: string, filterManager: FilterManager) {
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
        reloadAppointments();
    }, [filterManager.search, filterManager.statusID, filterManager.deleted, filterManager.columnDirections]);

    useEffect(() => {
        updateTableAppointments();
    }, [appointments, filterManager.pageIndex]);

    const formatAppointments = (appointments: DB_AppointmentOverviews) => {
        const apps: Array<Appointment> = [];
        for (const appointment of appointments.Appointments) {
            apps.push({
                ...appointment,
                Labels: appointments.Labels[appointment.AppointmentID]
            });
        }
        return apps;
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
        const appointments = await SelectAllAppointments({
            ...filter,
            sessionID
        }) as DB_AppointmentOverviews;
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

    const reloadAppointments = async () => {
        const filter = filterManager.filter();
        const appointments = await SelectAllAppointments({
            ...filter,
            sessionID
        }) as DB_AppointmentOverviews;
        setAppointments(formatAppointments(appointments));
        filterManager.updateMaxPageIndex(appointments.Count);
    }

    const updateAppointmentLabel = (appointmentID: string, labels: DB_SingleAppointmentLabel) => {
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
        reloadAppointments,
        updateAppointmentLabel
    }
}