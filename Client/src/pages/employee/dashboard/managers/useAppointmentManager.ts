import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectAllAppointments from "@/services/DB/Appointment/SelectAllAppointments";
import { FilterManager } from "./useFilterManager";
import { AppointmentLabels, AppointmentList, AppointmentEntry } from "waltronics-types";

export interface Appointment extends AppointmentEntry {Labels: AppointmentLabels}
export interface Appointments {[appointmentID: string]: Appointment}
export type AppointmentManager = ReturnType<typeof useAppointmentManager>;

export default function useAppointmentManager(filterManager: FilterManager) {
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

    const formatAppointments = (appointments: AppointmentList) => {
        // Not sure if this is going to cause issues
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
        const appointments = await SelectAllAppointments(filter) as AppointmentList;
        setAppointments(formatAppointments(appointments));
        filterManager.updateMaxPageIndex(appointments.Count);
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
        reloadAppointments,
        updateAppointmentLabel
    }
}