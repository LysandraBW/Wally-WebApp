import clsx from "clsx";
import XCircleIcon from "@/component/Icons/Icons/XCircleIcon";
import ShowResults from "./ShowResults";

interface ShowResultsFailedProps {
    restart: () => void;
}

export default function ShowResultsFailed(props: ShowResultsFailedProps) {
    return (
        <ShowResults
            Icon={
                <XCircleIcon
                    className="size-20 stroke-green-500 stroke-[1px]"
                />
            }
            head="Something Went Wrong"
            body="Please try to schedule your appointment again. If this error continues, please call us at 000-000-0000."
            More={
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
            }
        />
    )
}