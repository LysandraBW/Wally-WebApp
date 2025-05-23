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
import { Fragment, useEffect, useReducer, useState } from "react";
import { BarLoader } from "react-spinners";

export default function Page() {
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [loaded, setLoaded] = useState(false);
    const [loadingTable, setLoadingTable] = useState<{[k: string]: boolean}>({"toggleManager": false});
    const filterManager = useFilterManager(setLoadingTable);
    const appointmentManager = useAppointmentManager(filterManager, setLoadingTable);
    const toggleManager = useToggleManager(appointmentManager, setLoadingTable);
    const deleteManager = useDeleteManager(alertDispatch, toggleManager, filterManager, appointmentManager, setLoadingTable);

    useInterval(() => {
        // Every second, the alerts will be refreshed,
        // so that older alerts will be removed after
        // a certain amount of time has passed.
        alertDispatch({type: AlertActionType.Refresh});
    }, 1000*1);

    useEffect(() => {
        let loaded = true;
        console.log(loadingTable);
        for (const isLoaded of Object.values(loadingTable)) {
            if (!isLoaded) {
                loaded = false;
                break;
            }
        }
        setLoaded(loaded);
    }, [loadingTable]);

    return (
        <div className="overflow-x-clip">
            <Alert
                alert={alert}
            />
            <div>
                <div className="p-8 flex flex-col gap-4">
                    <h5 className="font-medium">Dashboard</h5>
                    <div className="flex flex-col gap-4">
                        <SearchBar
                            filterManager={filterManager}
                        />
                        <div 
                            className={clsx(
                                "border border-gray-200 rounded-md",
                                "overflow-x-scroll scroll-hide"
                            )}
                        >
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
                {appointmentManager.openedAppointment &&
                    <OpenedAppointment
                        appointmentID={appointmentManager.openedAppointment}
                        closeAppointment={appointmentManager.closeAppointment}
                    />
                } 
            </div>  
        </div>
    )
}