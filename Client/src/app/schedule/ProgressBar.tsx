import clsx from "clsx";
import { Fragment, useState } from "react"
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
                    "bg-base-200 rounded-[2.5px] hover:bg-base-200",
                    props.step >= props.rank && "!bg-blue-500 hover:!bg-blue-600"
                )}
            />
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
                className="!bg-base-0 dark:!bg-base-100 !color-white"
                border="1px solid #d1d5db"
            >
                <h6 className="text-xs text-base-700 font-medium tracking-wide">
                    {props.tooltipLabel}
                </h6>
            </Tooltip> 
        </Fragment>
    )
}