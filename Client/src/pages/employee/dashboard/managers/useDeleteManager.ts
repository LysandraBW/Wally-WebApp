import { Dispatch, SetStateAction } from "react";
import { FilterManager } from "./useFilterManager";
import { AlertAction } from "@/features/Alert/alertReducer";
import deleteFDispatch from "../dispatch/deleteFDispatch";
import deleteTDispatch from "../dispatch/deleteTDispatch";
import { AppointmentManager } from "./useAppointmentManager";
import undeleteTDispatch from "../dispatch/undeleteTDispatch";
import undeleteFDispatch from "../dispatch/undeleteFDispatch";
import DeleteAppointments, { DELETE_PERMANENT, DELETE_TEMPORARY } from "@/services/DB/Appointment/DeleteAppointments";
import RecoverAppointments from "@/services/DB/Appointment/UndeleteAppointments";
import deleteConfirmationDispatch from "../dispatch/deleteConfirmationDispatch";
import { ToggleManager } from "./useToggleManager";
import randomKey from "@/features/Alert/randomKey";

export type DeleteManager = ReturnType<typeof useDeleteManager>;

export default function useDeleteManager(alertDispatch: Dispatch<AlertAction>, toggleManager: ToggleManager, filterManager: FilterManager, appointmentManager: AppointmentManager, setLoadingTable: Dispatch<SetStateAction<{[k: string]: boolean}>>) {
    const undeleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;

        if (await RecoverAppointments({appointmentIDs})) {
            alertDispatch(undeleteTDispatch(randomKey(), alertDispatch));
        }
        else {
            alertDispatch(undeleteFDispatch(randomKey(), alertDispatch));
        }
        await appointmentManager.loadAppointments();
    }

    const deleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;

        const permanent = filterManager.deleted === "1";
        if (await DeleteAppointments(appointmentIDs, permanent ? DELETE_PERMANENT : DELETE_TEMPORARY))
            alertDispatch(deleteTDispatch(randomKey(), alertDispatch));
        else
            alertDispatch(deleteFDispatch(randomKey(), alertDispatch));
        await appointmentManager.loadAppointments();

        // Close Opened Appointment, if Deleted
        if (appointmentIDs.findIndex(s => s === appointmentManager.openedAppointment) !== -1) {
            appointmentManager.closeAppointment();
        }
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