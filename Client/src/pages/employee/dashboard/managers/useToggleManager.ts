import { useEffect, useState } from "react";
import { AppointmentManager } from "./useAppointmentManager";
import UpdateAppointmentLabel from "@/services/DB/Procedure/Appointment/UpdateAppointmentLabel";

export type ToggleManager = ReturnType<typeof useToggleManager>;

export default function useToggleManager(sessionID: string, appointmentManager: AppointmentManager) {
    const [allSelected, setAllSelected] = useState(false);
    const [selectedAppointments, setSelectedAppointments] = useState<Array<string>>([]);

    useEffect(() => {
        if (!appointmentManager.appointments)
            return;
        setAllSelected(selectedAppointments.length === appointmentManager.appointments.length);
    }, [selectedAppointments]);

    useEffect(() => {
        if (!appointmentManager.appointments)
            return;
        const appointmentIDs = Object.keys(appointmentManager.appointments);
        const updatedSelectedAppointments = selectedAppointments.filter(sID => appointmentIDs.includes(sID));
        setSelectedAppointments(updatedSelectedAppointments);
    }, [appointmentManager.appointments]);

    const toggleAllSelections = () => {
        if (!appointmentManager.appointments)
            return;
        // There are still checked appointments,
        // so we're going to uncheck them all.
        if (selectedAppointments.length) {
            setAllSelected(false);
            setSelectedAppointments([]);
            return;
        }
        // There are no checked appointments,
        // so we're going to check them all.
        const allIDs = appointmentManager.appointments.map(app => app.AppointmentID);
        setAllSelected(true);
        setSelectedAppointments(allIDs);
    }

    const toggleAppointmentSelection = (appointmentID: string) => {
        const index = selectedAppointments.indexOf(appointmentID);
        // Appointment ID wasn't found in the
        // selection, so we're going to add it.
        if (index === -1) {
            setSelectedAppointments(IDs => [...IDs, appointmentID]);
            return;
        }
        // Appointment ID was found in the selection,
        // so we're going to remove it.
        setSelectedAppointments(IDs => {
            let updatedIDs = [...IDs];
            updatedIDs.splice(index, 1);
            return updatedIDs;
        });
    }

    const toggleAppointmentLabel = async (appointmentID: string, labelName: string) => {
        if (!appointmentManager.appointments)
            return;

        const appointment = appointmentManager.appointments.find(a => a.AppointmentID === appointmentID);
        if (!appointment)
            throw "Appointment Not Found!";

        const labels = appointment.Labels;
        const label = labels[labelName];
        const labelID = label.LabelID;
        const labelValue = label.Value || 0;

        // Here, we query the database to update the appointment label.
        // If something bad happened, we don't actually update the label (early return).
        if (!(await UpdateAppointmentLabel({labelID, sessionID, appointmentID})))
            return;

        // Here, we update the label on the client's end.
        const updatedLabels = {...labels};
        updatedLabels[labelName].Value = 1 - labelValue;
        appointmentManager.updateAppointmentLabel(appointmentID, updatedLabels);
    }

    return {
        allSelected,
        selectedAppointments,
        toggleAllSelections, 
        toggleAppointmentSelection,
        toggleAppointmentLabel
    }
}