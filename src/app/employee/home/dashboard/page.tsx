"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert, AlertActionType } from "@/features/Alert/alertReducer";
import useInterval from "@/features/Alert/useInterval";
import useAppointmentManager from "@/app/employee/home/dashboard/managers/useAppointmentManager";
import useDeleteManager from "@/app/employee/home/dashboard/managers/useDeleteManager";
import useFilterManager from "@/app/employee/home/dashboard/managers/useFilterManager";
import useToggleManager from "@/app/employee/home/dashboard/managers/useToggleManager";
import AppointmentPane from "@/app/employee/home/dashboard/AppointmentPane/AppointmentPane";
import StatusTabs from "@/app/employee/home/dashboard/TabsL2";
import Table from "@/app/employee/home/dashboard/Table/Table";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { BarLoader, FadeLoader, MoonLoader, SquareLoader } from "react-spinners";
import { AnimatePresence } from "motion/react";
import { EmployeeContext } from "../layout";
import TabsL1 from "./TabL1";
import TabL1 from "./TabL1";
import InboxStackIcon from "@/component/Icons/Icons/InboxStackIcon";
import TrashIcon from "@/component/Icons/Icons/TrashIcon";
import StarIcon from "@/component/Icons/Icons/StarIcon";
import BookmarkIcon from "@/component/Icons/Icons/BookmarkIcon";
import EyeIcon from "@/component/Icons/Icons/EyeIcon";
import SparklesIcon from "@/component/Icons/Icons/SparklesIcon";
import resizeMainContent from "@/shared/ReadWriteAppointment/resizeMainContent";
import ToolBar from "./Toolbar/ToolBar";

// after:absolute after:right-[-1px] after:top-0 after:w-[1px] after:h-full after:bg-gradient-to-b after:from-base-300 dark:after:from-base-200 dark:to-transparent
// grid grid-cols-[minmax(0,1fr)_minmax(0,5fr)]
// after:absolute after:left-[0px] after:top-0 after:w-[1px] after:h-full after:bg-gradient-to-b after:from-base-300 dark:after:from-base-200 dark:to-transparent

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


    // useEffect(() => {
    //     window.addEventListener("resize", resizeMainContent);
    //     resizeMainContent();
    // }, []);


    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Dashboard");
    }, [employeeContext]);


    return (
        <div className="w-full h-full flex flex-col grow">
            <Alert
                alert={alert}
            />
            <div className="w-full h-full flex flex-col grow">
                <div className="p-2 flex items-center gap-2 border-b border-base-300 dark:border-base-200">
                    <ToolBar
                        deleteManager={deleteManager}
                        filterManager={filterManager}
                        appointmentManager={appointmentManager}
                    />
                </div>
                <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[auto_auto_1fr] grow">
                    <div className="h-fit p-2 flex gap-2 border-b border-base-300 dark:border-base-200 overflow-x-auto">
                        <TabL1
                            icon={
                                <InboxStackIcon 
                                    className="size-4 stroke-inherit"
                                />
                            }
                            label="General"
                            labelID=""
                            filterManager={filterManager}
                            onClick={filterManager.setLabelID}
                        />
                        <TabL1
                            icon={
                                <SparklesIcon 
                                    className="size-4 stroke-inherit"
                                />
                            }
                            label="New"
                            labelID="-1"
                            filterManager={filterManager}
                            onClick={filterManager.setLabelID}
                        />
                        <TabL1
                            icon={
                                <EyeIcon 
                                    className="size-4 stroke-inherit"
                                />
                            }
                            label="Seen"
                            labelID="1"
                            filterManager={filterManager}
                            onClick={filterManager.setLabelID}
                        />
                        <TabL1
                            icon={
                                <BookmarkIcon 
                                    className="size-4 stroke-inherit"
                                />
                            }
                            label="Flagged"
                            labelID="2"
                            filterManager={filterManager}
                            onClick={filterManager.setLabelID}
                        />
                        <TabL1
                            icon={
                                <StarIcon 
                                    className="size-4 stroke-inherit"
                                />
                            }
                            label="Starred"
                            labelID="3"
                            filterManager={filterManager}
                            onClick={filterManager.setLabelID}
                        />
                        <TabL1
                            icon={
                                <TrashIcon 
                                    className="size-4 stroke-inherit"
                                />
                            }
                            label="Deleted"
                            labelID="Deleted"
                            filterManager={filterManager}
                            onClick={filterManager.setLabelID}
                        />
                    </div>
                     <div 
                        id="Tabs"
                        className="h-fit p-2 flex gap-4 border-b border-base-300 dark:border-base-200 overflow-x-auto overflow-y-clip"
                    >
                        <StatusTabs
                            filterManager={filterManager}
                        />
                    </div>
                    <div 
                        id="MainContent"
                        className="relative flex flex-col grow relative h-full"
                    >
                        {loaded && 
                            <div className="h-full flex flex-col grow relative z-0">
                                <Table
                                    filterManager={filterManager}
                                    toggleManager={toggleManager}
                                    deleteManager={deleteManager}
                                    appointmentManager={appointmentManager}
                                />
                                <div className="grow relative"/>
                            </div>
                        }
                        {!loaded &&
                            <div className="flex flex-col grow w-full justify-center items-center">
                                <BarLoader
                                    color={"#3b82f6"}
                                    speedMultiplier={0.5}
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
                        appointmentManager={appointmentManager}
                    />
                } 
            </AnimatePresence>
        </div>
    )
}