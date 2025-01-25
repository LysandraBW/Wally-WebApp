import ArrowClockwiseIcon from "@/component/Icon/ArrowClockwise";
import TrashIcon from "@/component/Icon/Trash";
import { AppointmentManager } from "./managers/useAppointmentManager";
import { DeleteManager } from "./managers/useDeleteManager";
import Navigation from "./Navigation";
import { FilterManager } from "./managers/useFilterManager";
import clsx from "clsx";

interface ActionsProps {
    deleteManager: DeleteManager;
    filterManager: FilterManager;
    appointmentManager: AppointmentManager;
}

export default function Actions(props: ActionsProps) {
    return (
        <div 
            className={clsx(
                "flex justify-between p-2",
                "border-b border-gray-200"
            )}
        >
            <div className="flex gap-2">
                {/* Delete Button */}
                <button 
                    onClick={props.deleteManager.safelyDeleteSelectedAppointments}
                    className={clsx(
                        "flex justify-center items-center",
                        "icon aspect-square !bg-transparent",
                        "border border-gray-200 shadow-sm",
                        "hover:fill-red-500 hover:!border-red-300",
                        "hover:stroke-red-500"
                    )}
                >
                    <TrashIcon
                        width="14"
                        height="14"
                    />
                </button>
                {/* Refresh Button */}
                <button
                    className={clsx(
                        "flex justify-center items-center",
                        "border border-gray-200 shadow-sm",
                        "!bg-transparent icon aspect-square",
                        "hover:fill-blue-500 hover:!border-blue-300",
                        "hover:stroke-blue-500"
                    )}
                    onClick={props.appointmentManager.reloadAppointments}
                >
                    <ArrowClockwiseIcon
                        width="14"
                        height="14"
                        strokeWidth="0.5"
                    />
                </button>
            </div>
            {/* Navigation */}
            <Navigation
                filterManager={props.filterManager}
            />
        </div>
    )
}