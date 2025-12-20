import ArrowClockwiseIcon from "@/component/Icon/Icons/ArrowPath";
import TrashIcon from "@/component/Icon/Trash";
import { AppointmentManager } from "../managers/useAppointmentManager";
import { DeleteManager } from "../managers/useDeleteManager";
import Navigation from "./Navigation";
import { FilterManager } from "../managers/useFilterManager";
import clsx from "clsx";
import ArrowUpOnSquareStack from "@/component/Icon/ArrowUpOnSquareStack";
import Search from "./Search";
import { Fragment } from "react";
import ArrowPath from "@/component/Icon/Icons/ArrowPath";
import ArrowUpOnSquareIcon from "@/component/Icon/Icons/ArrowUpOnSquare";

interface ToolBarProps {
    deleteManager: DeleteManager;
    filterManager: FilterManager;
    appointmentManager: AppointmentManager;
}

export default function ToolBar(props: ToolBarProps) {
    return (
        <Fragment>
            <div className="flex gap-1">
                {/* Delete Button */}
                <button 
                    onClick={props.deleteManager.safelyDeleteSelectedAppointments}
                    className={clsx(
                        "flex justify-center items-center",
                        "rounded aspect-square !w-[28px] bg-white",
                        "border border-gray-300 shadow-sm",
                        "hover:!bg-gray-100 group !hover:stroke-gray-700"
                    )}
                >
                    <TrashIcon
                        class="stroke-inherit group-hover:stroke-gray-700"
                    />
                </button>
                {/* Refresh Button */}
                <button
                    className={clsx(
                        "flex justify-center items-center",
                        "border border-gray-300 shadow-sm",
                        "bg-white rounded !w-[28px] aspect-square stroke-gray-400",
                        "hover:!bg-gray-100 hover:stroke-gray-700"
                    )}
                    onClick={props.appointmentManager.loadAppointments}
                >
                    <ArrowPath
                        class="stroke-inherit"
                    />
                </button>
                {/* Recover Button */}
                {props.filterManager.labelID === "Deleted" &&
                    <button
                        className={clsx(
                            "flex justify-center items-center",
                            "border border-gray-300 shadow-sm",
                            "bg-white rounded !w-[28px] aspect-square stroke-gray-400",
                            "hover:!bg-gray-100 hover:stroke-gray-700"
                        )}
                        onClick={props.deleteManager.recoverSelectedAppointments}
                    >
                        <ArrowUpOnSquareIcon
                            class="stroke-inherit"
                        />
                    </button>
                }
            </div>
            {/* Search Bar */}
            <div className="mr-1 w-full">
                <Search
                    filterManager={props.filterManager}
                />
            </div>
            {/* Navigation */}
            {props.filterManager.maxPageIndex !== -1 &&
                <Navigation
                    filterManager={props.filterManager}
                />
            }
        </Fragment>
    )
}