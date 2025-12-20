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
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash3 fill-gray-400 group-hover:fill-gray-700" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-[15px] h-[15px] group-hover:stroke-gray-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                        </svg>
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