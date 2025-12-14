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
import Tab, { DeletedIcon, FlaggedIcon, GeneralIcon } from "./Tab";

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
        // console.log(loadingTable);
        let loaded = true;
        for (const isLoaded of Object.values(loadingTable)) {
            if (!isLoaded) {
                loaded = false;
                break;
            }
        }
        // console.log("Loaded: ", loaded);
        setLoaded(loaded);
    }, [loadingTable]);

    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Dashboard");
    }, [employeeContext]);

    return (
        <div className=" grow">
            <Alert
                alert={alert}
            />
            <div className="p-4 pb-0 grid grid-cols-[100px_calc(100%-100px-1rem)] gap-4 grow h-full">
                <div className="flex flex-col gap-4">
                    <Tab
                        icon={<GeneralIcon/>}
                        label="General"
                        labelID=""
                        filterManager={filterManager}
                        onClick={() => filterManager.setLabelID("")}
                    />
                    <Tab
                        icon={<GeneralIcon/>}
                        label="Seen"
                        labelID="1"
                        filterManager={filterManager}
                        onClick={() => filterManager.setLabelID("1")}
                    />
                    <Tab
                        icon={<GeneralIcon/>}
                        label="New"
                        labelID="-1"
                        filterManager={filterManager}
                        onClick={() => filterManager.setLabelID("-1")}
                    />
                    <Tab
                        icon={<FlaggedIcon/>}
                        label="Flagged"
                        labelID="2"
                        filterManager={filterManager}
                        onClick={() => filterManager.setLabelID("2")}
                    />
                    <Tab
                        icon={<DeletedIcon/>}
                        label="Deleted"
                        labelID="Deleted"
                        filterManager={filterManager}
                        onClick={() => filterManager.setLabelID("Deleted")}
                    />
                </div>
                <div className="flex flex-col bg-blue-400 grow border border-gray-300 border-b-0 rounded-t-md h-full">
                    <Actions
                        deleteManager={deleteManager}
                        filterManager={filterManager}
                        appointmentManager={appointmentManager}
                    />
                    <Statuses
                        filterManager={filterManager}
                    />
                    <div className="flex flex-col grow">
                        {loaded && 
                            // <div className={"flex flex-col grow bg-gray-100 overflow-x-scroll scroll-hide"}>
                                <Table
                                    filterManager={filterManager}
                                    toggleManager={toggleManager}
                                    deleteManager={deleteManager}
                                    appointmentManager={appointmentManager}
                                />
                            // </div>
                        }
                        {!loaded &&
                            <div className="flex flex-col grow w-full min-h-[200px] bg-white justify-center items-center">
                                <BarLoader
                                    color={"#000"}
                                    loading={true}
                                />
                            </div>
                        }
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