import ArrowClockwiseIcon from "@/component/Icon/ArrowClockwise";
import TrashIcon from "@/component/Icon/Trash";
import { AppointmentManager } from "../managers/useAppointmentManager";
import { DeleteManager } from "../managers/useDeleteManager";
import Navigation from "./Navigation";
import { FilterManager } from "../managers/useFilterManager";
import clsx from "clsx";
import ArrowUpOnSquareStack from "@/component/Icon/ArrowUpOnSquareStack";
import Search from "./Search";
import { Fragment } from "react";

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
                        "hover:!bg-gray-100 group"
                    )}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 fill-gray-400 group-hover:fill-black" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
                {/* Refresh Button */}
                <button
                    className={clsx(
                        "flex justify-center items-center",
                        "border border-gray-300 shadow-sm",
                        "bg-white rounded !w-[28px] aspect-square stroke-gray-400",
                        "hover:!bg-gray-100 hover:stroke-black"
                    )}
                    onClick={props.appointmentManager.loadAppointments}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                {/* Recover Button */}
                {props.filterManager.statusID === "-1" &&
                    <button
                        className={clsx(
                            "flex justify-center items-center",
                            "border border-gray-200 shadow-sm",
                            "!bg-transparent icon aspect-square !fill-none",
                            "hover:fill-blue-500 hover:!border-blue-300",
                            "hover:stroke-blue-500"
                        )}
                        onClick={props.deleteManager.recoverSelectedAppointments}
                    >
                        <ArrowUpOnSquareStack
                            className="w-[16px] h-[16px]"
                            strokeWidth="2"
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
            <Navigation
                filterManager={props.filterManager}
            />
        </Fragment>
    )
}