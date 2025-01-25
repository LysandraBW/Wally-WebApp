import Message from "@/component/Alert/Message";
import { AlertAction, AlertActionType, Key } from "@/features/Alert/alertReducer";
import { Dispatch } from "react";

export default function saveFDispatch(key: Key, alertDispatch: Dispatch<AlertAction>) {
    return {
        type: AlertActionType.AddMessage,
        key: key,
        node: (
            <Message
                head="Failed to Save Changes"
                body="Failed to save changes. Please try again."
                type="Error"
                onClose={() => {
                    alertDispatch({
                        type: AlertActionType.DeleteMessage,
                        key: key
                    });
                }}
            />
        )
    }
}