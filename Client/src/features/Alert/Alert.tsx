import { AlertState } from "@/features/Alert/alertReducer";
import { Fragment } from "react";

interface AlertProps {
    alert: AlertState;
}

export default function Alert(props: AlertProps) {
    return (
        <Fragment>
            {props.alert.confirmation}
            {props.alert.messages.map(({node}, i) => (
                <Fragment 
                    key={i}
                >
                    {node}
                </Fragment>
            ))}
        </Fragment>
    )
}