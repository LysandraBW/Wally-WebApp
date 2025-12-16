import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterManager } from "./useFilterManager";
import { AlertAction } from "@/features/Alert/alertReducer";
import deleteFDispatch from "../dispatch/deleteFDispatch";
import deleteTDispatch from "../dispatch/deleteTDispatch";
import { AppointmentManager } from "./useAppointmentManager";
import recoverTDispatch from "../dispatch/recoverTDispatch";
import recoverFDispatch from "../dispatch/recoverFDispatch";
import DeleteAppointments, { DELETE_PERMANENT, DELETE_TEMPORARY } from "@/services/DB/Appointment/DeleteAppointments";
import RecoverAppointments from "@/services/DB/Appointment/UndeleteAppointments";
import deleteConfirmationDispatch from "../dispatch/deleteConfirmationDispatch";
import { ToggleManager } from "./useToggleManager";
import randomKey from "@/features/Alert/randomKey";

export type DeleteManager = ReturnType<typeof useDeleteManager>;

export default function useDeleteManager(alertDispatch: Dispatch<AlertAction>, toggleManager: ToggleManager, filterManager: FilterManager, appointmentManager: AppointmentManager, setLoadingTable: Dispatch<SetStateAction<{[k: string]: boolean}>>) {
    const [permanent, setPermanent] = useState(false);


    useEffect(() => {
        const permanent = filterManager.labelID === "Deleted";
        setPermanent(permanent);
    }, [filterManager.labelID]);


    const recoverAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;

        if (await RecoverAppointments({appointmentIDs}))
            alertDispatch(recoverTDispatch(randomKey(), alertDispatch));
        else
            alertDispatch(recoverFDispatch(randomKey(), alertDispatch));

        await appointmentManager.loadAppointments();
    }


    const recoverSelectedAppointments = async () => {
        const IDs = toggleManager.selectedAppointments;
        recoverAppointments(IDs);
    }


    const deleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;

        if (await DeleteAppointments(appointmentIDs, permanent ? DELETE_PERMANENT : DELETE_TEMPORARY))
            alertDispatch(deleteTDispatch(randomKey(), alertDispatch));
        else
            alertDispatch(deleteFDispatch(randomKey(), alertDispatch));
        await appointmentManager.loadAppointments();

        // Close Opened Appointment, if Deleted
        if (appointmentIDs.findIndex(s => s === appointmentManager.openedAppointment) !== -1)
            appointmentManager.closeAppointment();
    }


    const safelyDeleteAppointments = async (appointmentIDs: Array<string>) => {
        if (!appointmentIDs.length)
            return;
        
        // As we're not permanently deleting appointments,
        // we don't need to warn the user.
        if (!permanent) {
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


    return {
        recoverAppointments,
        safelyDeleteAppointments,
        safelyDeleteSelectedAppointments,
        recoverSelectedAppointments
    }
}