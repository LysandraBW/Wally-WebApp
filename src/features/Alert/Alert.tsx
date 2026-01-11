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
                <div 
                    key={i}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: (100 + props.alert.messages.length) - i,
                        translate: `0px ${i * 15}px`                      
                    }}
                    className="w-full h-min"
                >
                    {node}
                </div>
            ))}
        </Fragment>
    )
}