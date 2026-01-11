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
                    "w-full h-full !shadow-none",
                    "flex justify-center items-center",
                    "bg-base-0 dark:bg-base-50 rounded-full hover:bg-base-200",
                    props.step >= props.rank && "!bg-gradient-to-b from-white to-blue-400 border border-blue-700 hover:!bg-blue-800 p-[0.5px]"
                )}
            >
                {props.step >= props.rank &&
                    <div className="h-full w-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"/>
                }
            </div>
            <Tooltip
                anchorSelect={`#${props.id}`}
                opacity={1}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.25rem",
                    backgroundColor: "white",
                    boxShadow: "0px 2px 2px 0px #00000006",
                    borderRadius: "6px"
                }}
                className="!bg-base-0 dark:!bg-base-100 !color-white border border-base-300 dark:!border-base-200"
            >
                <h6 className="text-xs text-base-700 font-medium tracking-wide">
                    {props.tooltipLabel}
                </h6>
            </Tooltip> 
        </Fragment>
    )
}