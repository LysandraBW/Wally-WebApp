import { AlertState } from "@/features/Alert/alertReducer";

interface AlertProps {
    alert: AlertState;
}

export default function Alert(props: AlertProps) {
    return (
        <div>
            {props.alert.confirmation}
            {props.alert.messages.map(({node}, i) => (
                <div key={i}>
                    {node}
                </div>
            ))}
        </div>
    )
}