import Message from "@/component/Alert/Message";
import { AlertAction, AlertActionType, Key } from "@/features/Alert/alertReducer";
import { Dispatch } from "react";

export default function deleteTDispatch(key: Key, alertDispatch: Dispatch<AlertAction>) {
    return {
        type: AlertActionType.AddMessage,
        key: key,
        node: (
            <Message
                head="Successfully Deleted Event"
                body="Deleted Event(s)"
                type="Success"
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