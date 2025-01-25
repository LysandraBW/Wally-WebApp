import Navigation from "./Navigation";
import useInterval from "@/features/Alert/useInterval";
import { useReducer } from "react";
import OpenedAppointment from "./OpenedAppointment";
import useDeleteManager from "./managers/useDeleteManager";
import useFilterManager from "./managers/useFilterManager";
import useToggleManager from "./managers/useToggleManager";
import useAppointmentManager from "./managers/useAppointmentManager";
import alertReducer, { AlertActionType, startAlert } from "@/features/Alert/alertReducer";
import Alert from "@/features/Alert/Alert";
import TableHead from "./Table/Head";
import TableRow from "./Table/Row";
import SearchBar from "./SearchBar";
import Actions from "./Actions";
import Statuses from "./Statuses";
import Table from "./Table/Table";
import clsx from "clsx";

interface DashboardProps {
    sessionID: string;
}

export default function Dashboard(props: DashboardProps) {
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const filterManager = useFilterManager();
    const appointmentManager = useAppointmentManager(props.sessionID, filterManager);
    const toggleManager = useToggleManager(props.sessionID, appointmentManager);
    const deleteManager = useDeleteManager(props.sessionID, alertDispatch, toggleManager, filterManager, appointmentManager);

    useInterval(() => {
        // Every second, the alerts will be refreshed,
        // so that older alerts will be removed after
        // a certain amount of time has passed.
        alertDispatch({type: AlertActionType.Refresh});
    }, 1000*1);

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
                            <div className="overflow-x-auto scroll-hide">
                                <Table
                                    filterManager={filterManager}
                                    toggleManager={toggleManager}
                                    deleteManager={deleteManager}
                                    appointmentManager={appointmentManager}
                                />
                            </div>
                        </div>
                    </div>
                </div>                 
                {appointmentManager.openedAppointment &&
                    <OpenedAppointment
                        sessionID={props.sessionID}
                        appointmentID={appointmentManager.openedAppointment}
                        closeAppointment={appointmentManager.closeAppointment}
                    />
                } 
            </div>  
        </div>
    )
}