import { Dispatch } from "react";
import { FilterManager } from "./useFilterManager";
import { AlertAction } from "@/features/Alert/alertReducer";
import deleteFDispatch from "../dispatch/deleteFDispatch";
import deleteTDispatch from "../dispatch/deleteTDispatch";
import { AppointmentManager } from "./useAppointmentManager";
import undeleteTDispatch from "../dispatch/undeleteTDispatch";
import undeleteFDispatch from "../dispatch/undeleteFDispatch";
import DeleteAppointments from "@/services/DB/Procedure/Appointment/DeleteAppointments";
import UndeleteAppointments from "@/services/DB/Procedure/Appointment/UndeleteAppointments";
import deleteConfirmationDispatch from "../dispatch/deleteConfirmationDispatch";
import { ToggleManager } from "./useToggleManager";
import randomKey from "@/features/Alert/randomKey";

export type DeleteManager = ReturnType<typeof useDeleteManager>;

export default function useDeleteManager(sessionID: string, alertDispatch: Dispatch<AlertAction>, toggleManager: ToggleManager, filterManager: FilterManager, appointmentManager: AppointmentManager) {
    const undeleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;

        if (await UndeleteAppointments({sessionID, appointmentIDs})) 
            alertDispatch(undeleteTDispatch(randomKey(), alertDispatch));
        else 
            alertDispatch(undeleteFDispatch(randomKey(), alertDispatch));
        await appointmentManager.reloadAppointments();
    }

    const deleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;

        const permanent = filterManager.deleted === "1";
        if (await DeleteAppointments({sessionID, appointmentIDs}, permanent, true))
            alertDispatch(deleteTDispatch(randomKey(), alertDispatch));
        else
            alertDispatch(deleteFDispatch(randomKey(), alertDispatch));
        await appointmentManager.reloadAppointments();
    }

    const safelyDeleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;
        
        // As we're not permanently deleting appointments,
        // we don't need to warn the user.
        if (filterManager.deleted === "0") {
            deleteAppointments(appointmentIDs);
            return;
        }
        // Naturally, we'll have to warn the user here.
        alertDispatch(deleteConfirmationDispatch(() => deleteAppointments(appointmentIDs), alertDispatch));
    }

    const safelyDeleteSelectedAppointments = async () => {
        const IDs = toggleManager.selectedAppointments;
        if (!IDs.length)
            return;
        safelyDeleteAppointments(IDs);
    }

    const undeleteSelectedAppointments = async () => {
        const IDs = toggleManager.selectedAppointments;
        undeleteAppointments(IDs);
    }

    return {
        undeleteAppointments,
        safelyDeleteAppointments,
        safelyDeleteSelectedAppointments,
        undeleteSelectedAppointments
    }
}