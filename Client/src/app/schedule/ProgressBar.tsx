import clsx from "clsx";
import { Fragment } from "react"
import { Tooltip } from "react-tooltip";

interface ProgressBarProps {
    id: string;
    step: number;
    rank: number;
    tooltipLabel: string;
    canShowTooltip: boolean;
}

export default function ProgressBar(props: ProgressBarProps) {
    return (
        <Fragment>
            <div 
                id={props.id} 
                data-tooltip-place="bottom"
                className={clsx(
                    "w-full h-full",
                    "flex justify-center items-center",
                    "bg-white shadow-sm border border-white rounded",
                    "group",
                    props.step >= props.rank && "!bg-blue-700 !border-blue-800",
                    props.canShowTooltip && "cursor-pointer hover:bg-black hover:border-black transition-all"
                )}
            >
                <div 
                    className={clsx(
                        "w-1 h-1", 
                        "bg-gray-300 rounded-full",
                        props.step >= props.rank && "bg-white"
                    )}
                />
            </div>
            {
                props.canShowTooltip &&
                    <Tooltip
                        anchorSelect={`#${props.id}`}
                        border="1px solid rgb(229 231 235)"
                        opacity={1}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.25rem",
                            backgroundColor: "white",
                            boxShadow: "0px 2px 2px 0px #00000010",
                        }}
                    >
                        <h6 className="text-sm text-gray-700">
                            {props.tooltipLabel}
                        </h6>
                    </Tooltip> 
            }
        </Fragment>
    )
}