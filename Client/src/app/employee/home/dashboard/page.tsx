"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert, AlertActionType } from "@/features/Alert/alertReducer";
import useInterval from "@/features/Alert/useInterval";
import Actions from "@/pages/employee/dashboard/Actions";
import useAppointmentManager from "@/pages/employee/dashboard/managers/useAppointmentManager";
import useDeleteManager from "@/pages/employee/dashboard/managers/useDeleteManager";
import useFilterManager from "@/pages/employee/dashboard/managers/useFilterManager";
import useToggleManager from "@/pages/employee/dashboard/managers/useToggleManager";
import OpenedAppointment from "@/pages/employee/dashboard/OpenedAppointment";
import SearchBar from "@/pages/employee/dashboard/SearchBar";
import Statuses from "@/pages/employee/dashboard/Statuses";
import Table from "@/pages/employee/dashboard/Table/Table";
import clsx from "clsx";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { BarLoader } from "react-spinners";
import { AnimatePresence } from "motion/react";
import { EmployeeContext } from "../layout";

export default function Page() {
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [loaded, setLoaded] = useState(false);
    const [loadingTable, setLoadingTable] = useState<{[k: string]: boolean}>({"toggleManager": false});
    const filterManager = useFilterManager(setLoadingTable);
    const appointmentManager = useAppointmentManager(filterManager, setLoadingTable);
    const toggleManager = useToggleManager(appointmentManager, setLoadingTable);
    const deleteManager = useDeleteManager(alertDispatch, toggleManager, filterManager, appointmentManager, setLoadingTable);
    const employeeContext = useContext(EmployeeContext);

    useInterval(() => {
        // Every second, the alerts will be refreshed,
        // so that older alerts will be removed after
        // a certain amount of time has passed.
        alertDispatch({type: AlertActionType.Refresh});
    }, 1000*1);

    useEffect(() => {
        let loaded = true;
        for (const isLoaded of Object.values(loadingTable)) {
            if (!isLoaded) {
                loaded = false;
                break;
            }
        }
        setLoaded(loaded);
    }, [loadingTable]);

    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Dashboard");
    }, [employeeContext]);

    return (
        <div className="overflow-x-clip grow">
            <Alert
                alert={alert}
            />
            <div className="p-8 pt-5 flex flex-col gap-5 grow">
                <h5 className="font-medium">Dashboard</h5>
                <div className="flex gap-4">
                    <div className="w-[200px] flex flex-col gap-2">
                        {[
                            [
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                                </svg>,
                                "General"], 
                            [
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>,
                                "Flagged"
                            ], 
                            [
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>,
                                "Deleted"
                            ]].map((category, i) => (
                            <div 
                                key={i}
                                className={clsx("w-full py-1 px-2 pr-1 rounded flex gap-1 justify-between items-center bg-white border border-gray-300 shadow-sm group hover:bg-gray-100 cursor-pointer", filterManager.category === category[1] && "!border-blue-50-0")}
                            >
                                <div className="flex gap-1 items-center">
                                    <span className={clsx("block stroke-gray-400 group-hover:stroke-black-", filterManager.category === category[1] && "!stroke-black")}>{category[0]}</span>
                                    <span className={clsx("tracking-wide text-xs group-hover:text-black-", filterManager.category === category[1] && "font-medium text-black")}>{category[1]}</span>
                                </div>
                                {filterManager.category === category[1] && 
                                    <div style={{width: "4px"}} className="h-full bg-blue-500 rounded-full"></div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="border border-gray-300 border-b-0 rounded-t-md overflow-x-scroll scroll-hide w-full">
                        <Actions
                            deleteManager={deleteManager}
                            filterManager={filterManager}
                            appointmentManager={appointmentManager}
                        />
                        <Statuses
                            filterManager={filterManager}
                        />
                        <div className="bg-gray-200">
                            {loaded && 
                                <div className={"bg-white overflow-x-auto scroll-hide"}>
                                    <Table
                                        filterManager={filterManager}
                                        toggleManager={toggleManager}
                                        deleteManager={deleteManager}
                                        appointmentManager={appointmentManager}
                                    />
                                </div>
                            }
                            {!loaded &&
                                <div className="w-full min-h-[200px] bg-white flex items-center justify-center">
                                    <BarLoader
                                        color={"#000"}
                                        loading={true}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>     
            <AnimatePresence>            
                {appointmentManager.openedAppointment &&
                        <OpenedAppointment
                            appointmentID={appointmentManager.openedAppointment}
                            closeAppointment={appointmentManager.closeAppointment}
                        />
                } 
            </AnimatePresence>
        </div>
    )
}