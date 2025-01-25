import Message from "@/component/Alert/Message";
import { AlertAction, AlertActionType, Key } from "@/features/Alert/alertReducer";
import { Dispatch } from "react";

export default function undeleteTDispatch(key: Key, alertDispatch: Dispatch<AlertAction>) {
    return {
        type: AlertActionType.AddMessage,
        key: key,
        node: (
            <Message
                head="Successfully Recovered Appointments"
                body="Recovered Appointment(s)"
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