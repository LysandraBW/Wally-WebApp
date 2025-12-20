import Confirm from "@/component/Alert/Confirm";
import { AlertAction, AlertActionType } from "@/features/Alert/alertReducer";
import { Dispatch } from "react";

export default function deleteConfirmationDispatch(onY: () => void, alertDispatch: Dispatch<AlertAction>) {
    return {
        type: AlertActionType.PutConfirmation,
        node: (
            <Confirm
                head="Delete Event"
                body="You are going to permanently delete this event."
                nLabel="No"
                yLabel="Yes"
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