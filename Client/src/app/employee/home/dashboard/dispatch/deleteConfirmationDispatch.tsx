import Confirm from "@/component/Alert/Confirm";
import { AlertAction, AlertActionType } from "@/features/Alert/alertReducer";
import { Dispatch } from "react";

export default function deleteConfirmationDispatch(onY: () => void, alertDispatch: Dispatch<AlertAction>, head?: string, body?: string) {
    return {
        type: AlertActionType.PutConfirmation,
        node: (
            <Confirm
                head={head || "Delete Appointment"}
                body="You are going to permanently delete these appointment."
                nLabel="No"
                yLabel="Yes"
                absolute={true}
                irreversible={true}
                onY={async () => {
                    onY();
                    alertDispatch({type: AlertActionType.DeleteConfirmation});
                }}
                onN={() => {
                    alertDispatch({type: AlertActionType.DeleteConfirmation});
                }}
                onClose={() => {
                    alertDispatch({type: AlertActionType.DeleteConfirmation});
                }}
            />
        )
    }
}