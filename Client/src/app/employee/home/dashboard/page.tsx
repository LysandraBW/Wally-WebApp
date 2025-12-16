"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert, AlertActionType } from "@/features/Alert/alertReducer";
import useInterval from "@/features/Alert/useInterval";
import ToolBar from "@/app/employee/home/dashboard/ToolBar/ToolBar";
import useAppointmentManager from "@/app/employee/home/dashboard/managers/useAppointmentManager";
import useDeleteManager from "@/app/employee/home/dashboard/managers/useDeleteManager";
import useFilterManager from "@/app/employee/home/dashboard/managers/useFilterManager";
import useToggleManager from "@/app/employee/home/dashboard/managers/useToggleManager";
import AppointmentPane from "@/app/employee/home/dashboard/AppointmentPane";
import StatusTabs from "@/app/employee/home/dashboard/StatusTabs";
import Table from "@/app/employee/home/dashboard/Table/Table";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { BarLoader } from "react-spinners";
import { AnimatePresence } from "motion/react";
import { EmployeeContext } from "../layout";
import LabelTabs from "./LabelTabs";

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
        <div className=" grow">
            <Alert
                alert={alert}
            />
            <div className="p-4 pb-0 grid grid-cols-[100px_calc(100%-100px-1rem)] gap-4 grow h-full">
                <LabelTabs
                    filterManager={filterManager}
                    labels={filterManager.labels}
                    onClick={filterManager.setLabelID}
                />
                <div className="flex flex-col bg-blue-400 grow border border-gray-300 border-b-0 rounded-t-md h-full">
                    <div className="flex p-2 items-center gap-2 border-b border-gray-300 bg-white rounded-t-md">
                        <ToolBar
                            deleteManager={deleteManager}
                            filterManager={filterManager}
                            appointmentManager={appointmentManager}
                        />
                    </div>
                    <div className="flex gap-4 px-2 py-2 border-b border-gray-300 bg-white">
                        <StatusTabs
                            filterManager={filterManager}
                        />
                    </div>
                    <div className="flex flex-col grow">
                        {loaded && 
                            <Table
                                filterManager={filterManager}
                                toggleManager={toggleManager}
                                deleteManager={deleteManager}
                                appointmentManager={appointmentManager}
                            />
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
                        <AppointmentPane
                            appointmentID={appointmentManager.openedAppointment}
                            closeAppointment={appointmentManager.closeAppointment}
                        />
                } 
            </AnimatePresence>
        </div>
    )
}