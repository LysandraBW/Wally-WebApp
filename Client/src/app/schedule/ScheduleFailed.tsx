import clsx from "clsx";
import { Fragment } from "react";
import ScheduledHeader from "./ScheduledHeader";
import XCircleIcon from "@/component/Icon/Icons/XCircleIcon";

interface ScheduleFailedProps {
    restart: () => void;
}

export default function ScheduleFailed(props: ScheduleFailedProps) {
    return (
        <div className="flex flex-col items-center justify-center grow gap-10">
            <div className="flex justify-center items-center">
                <XCircleIcon
                    class="size-20 drop-shadow/50 stroke-red-500 stroke-1"
                />
            </div>
            <ScheduledHeader
                header="Something Went Wrong"
                paragraph={
                    <Fragment>
                        Please try to schedule your appointment again. If this error continues, please call us at 
                        <span className="text-inherit font-medium whitespace-nowrap">
                            000-000-0000
                        </span>.
                    </Fragment>}
            />
            <div className="flex justify-center min-w-[200px]">
                <button 
                    onClick={props.restart} 
                    className={clsx(
                        "w-full px-4 py-2",
                        "font-medium text-black tracking-wide",
                        "bg-white shadow-sm",
                        "border border-gray-200 rounded-lg",
                        "transition-all hover:bg-gray-900 hover:border-gray-900 hover:text-white"
                    )}
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}