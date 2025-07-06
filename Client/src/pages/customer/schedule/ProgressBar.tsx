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
                    "bg-white shadow-sm border border-white",
                    "w-full h-full flex justify-center items-center rounded shadow-sm group",
                    props.step >= props.rank && "!bg-blue-400 border !border-blue-400",
                    props.canShowTooltip && "cursor-pointer hover:bg-black hover:border-black transition-all"
                )}
            >
                <div className={clsx("w-1 h-1 rounded-full bg-gray-300", props.step >= props.rank && "bg-white")}></div>    
            </div>
            {
                props.canShowTooltip &&
                    <Tooltip
                        anchorSelect={`#${props.id}`}
                        border="1px solid rgb(229 231 235)"
                        opacity={1}
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0px 2px 2px 0px #00000010",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.25rem",
                        }}
                    >
                        <h6 className="text-sm tracking-normal text-gray-700">{props.tooltipLabel}</h6>
                    </Tooltip> 
            }
        </Fragment>
    )
}