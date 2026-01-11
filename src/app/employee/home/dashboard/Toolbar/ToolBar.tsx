import TrashIcon from "@/component/Icons/Icons/TrashIcon";
import { DeleteManager } from "../managers/useDeleteManager";
import { FilterManager } from "../managers/useFilterManager";
import { AppointmentManager } from "../managers/useAppointmentManager";
import { Fragment } from "react";
import ArrowUpOnSquareIcon from "@/component/Icons/Icons/ArrowUpOnSquareIcon";
import Search from "./Search";
import Navigation from "./Navigation";
import IconButton from "@/component/Button/IconButton";
import ArrowPathIcon from "@/component/Icons/Icons/ArrowPathIcon";

interface ToolBarProps {
    deleteManager: DeleteManager;
    filterManager: FilterManager;
    appointmentManager: AppointmentManager;
}

export default function ToolBar(props: ToolBarProps) {
    return (
        <Fragment>
            <div className="flex gap-2">
                {/* Delete Button */}
                <IconButton
                    className="w-[28px] dark:!bg-base-50"
                    onClick={props.deleteManager.safelyDeleteSelectedAppointments}
                >
                    <TrashIcon
                        className="size-4 stroke-inherit group-hover:stroke-gray-700"
                    />
                </IconButton>
                {/* Refresh Button */}
                <IconButton
                    className="w-[28px] dark:!bg-base-50"
                    onClick={props.appointmentManager.loadAppointments}
                >
                    <ArrowPathIcon
                        className="size-4 stroke-inherit group-hover:stroke-gray-700"
                    />
                </IconButton>
                {/* Recover Button */}
                {props.filterManager.labelID === "Deleted" &&
                    <IconButton
                        className="w-[28px] dark:!bg-base-50"
                        onClick={props.deleteManager.recoverSelectedAppointments}
                    >
                        <ArrowUpOnSquareIcon
                            className="size-4 stroke-inherit group-hover:stroke-gray-700"
                        />
                    </IconButton>
                }
            </div>
            {/* Search Bar */}
            <div className="w-full">
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