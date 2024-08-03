'use client';
import { getSessionID } from "@/lib/Storage/Storage";
import { Delete, GetAllAppointments, GetEmployee, Restore } from "@/database/Export";
import { goToEmployeeLogin } from "@/lib/Navigation/Navigation";
import { useEffect, useReducer, useState, createContext } from "react";
import useInterval from "@/hook/Alert/Timer";
import Head from "@/views/Employee/Dashboard/Dashboard/Table/Head";
import Body from "@/views/Employee/Dashboard/Dashboard/Table/Body";
import Overview from "@/views/Employee/Dashboard/Dashboard/Overview/Overview";
import { DefaultPageContext } from "@/process/Dashboard/Context";
import { DefaultController } from "@/process/Dashboard/Controller";
import { DefaultFilter, FilterStructure } from "@/process/Dashboard/Interface";
import AlertReducer, { AlertActionType, InitialAlert } from "@/hook/Alert/Reducer";
import { DB_Labels, DB_Statuses } from "@/database/Info/Info";
import Action from "@/views/Employee/Dashboard/Dashboard/Header/Action";
import Search from "@/views/Employee/Dashboard/Dashboard/Header/Search";
import Tabs from "@/views/Employee/Dashboard/Dashboard/Header/Tabs";
import Navigation from "@/views/Employee/Dashboard/Dashboard/Table/Navigation";
import { useSearchParams } from "next/navigation";
import { deleteMessage, restoreMessage } from "@/process/Dashboard/Helper";
import { MessageType } from "@/components/Alert/Message/Message";

let ran = false;
export const PageContext = createContext(DefaultPageContext);

export default function Dashboard() {
    const [context, setContext] = useState(DefaultPageContext);
    const [controller, setController] = useState(DefaultController);
    const [filter, setFilter] = useState(DefaultFilter);
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);

    // Apart from the other variables is the currently
    // opened appointment.
    const [openAptID, setOpenAptID] = useState('');
    const searchParameters = useSearchParams();

    useEffect(() => {
        const load = async () => {
            // Gathering Context
            const SessionID = await getSessionID();
            if (!SessionID) {
                goToEmployeeLogin();
                return;
            }

            const Employee = await GetEmployee({ SessionID });
            if (!Employee)
                throw 'Employee Error';

            const Labels = await DB_Labels();
            if (!Labels.length)
                throw 'Label Error';

            const Statuses = await DB_Statuses();
            if (!Statuses.length)
                throw 'Status Error';

            setContext({
                Employee: {
                    SessionID,
                    Employee
                },
                Categories: {
                    Labels,
                    Statuses
                },
                Loaded: true
            });
            
        await loadAllAppointments(filter);

        // Loading the Searched Appointment, if Any
        let searchedAptID = searchParameters.get('AptID');
        if (searchedAptID)
            setOpenAptID(searchedAptID);
        }
        if (ran) 
            return;
        load();
        ran = true;
    }, []);

    useInterval(() => {
        alertDispatch({
            type: AlertActionType.RefreshMessages
        });
    }, 1000*1);

    useEffect(() => {
        // Prevents Loading 'Splotchiness'
        if (!controller.Loading && !controller.Loaded)
            return;

        // Extracting Current Appointments
        const numberPages = Math.ceil(controller.All.Count/filter.PageSize);
        const currentPage = Math.max(Math.min(controller.Current.Page, numberPages), 1);

        const offset = (currentPage - 1) * filter.PageSize;
        const appointments = controller.All.Appointments.slice(offset, offset + filter.PageSize);

        // Updating Checked Appointments
        const appointmentIDs = appointments.map(app => app.AppointmentID);
        const checkedAppointmentIDs = controller.Current.Checked.filter(appointmentID => appointmentIDs.includes(appointmentID));

        // Update Controller
        setController({
            ...controller,
            Current: {
                Appointments: appointments,
                Page: currentPage,
                Checked: checkedAppointmentIDs
            },
            Loading: false,
            Loaded: true
        });
    }, [controller.All.Appointments, controller.Current.Page]);

    const loadAllAppointments = async (filter: FilterStructure) => {
        const allAppointments = await GetAllAppointments({
            SessionID: await getSessionID(), 
            ...filter
        });

        if (!allAppointments)
            throw 'Appointment Error';
        
        setController({
            ...controller,
            All: {
                Count:          allAppointments.Count,
                Appointments:   allAppointments.All,
                Labels:         allAppointments.Labels
            },
            Current: {
                Appointments: [],
                Page: 1,
                Checked: []
            },
            Loading: true,
            Loaded: false
        });
    }

    const deleteAppointments = async (appointmentIDs: Array<string>) => {
        const deletedAppointmentIDs: Array<string> = [];

        // Delete Appointments
        for (const appointmentID of appointmentIDs) {
            try {
                const output = await Delete({
                    SessionID: context.Employee.SessionID, 
                    AppointmentID: appointmentID
                });

                if (!output)
                    throw 'Failed to Delete Appointment';

                deletedAppointmentIDs.push(appointmentID);
            }
            catch (err) {
                break;
            }
        }

        // Lengths of Appointment IDs and Deleted Appointment IDs
        const lengthA = appointmentIDs.length;
        const lengthD = deletedAppointmentIDs.length;

        // Update Controller
        setController({
            ...controller,
            All: {
                ...controller.All,
                Appointments: controller.All.Appointments.filter(({AppointmentID}) => !deletedAppointmentIDs.includes(AppointmentID)),
                Count: controller.All.Count - lengthD,
            },
            Loading: true,
            Loaded: false
        });

        // Show Message
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: deleteMessage(lengthA, lengthD),
                messageType: lengthA === lengthD ? MessageType.Success : MessageType.Error
            }
        });
    }

    const deleteAppointmentsHandler = async (appointmentIDs: Array<string>) => {
        // Putting Appointment into Recycling Bin
        // No Confirmation Message
        if (!filter.Deleted) {
            await deleteAppointments(appointmentIDs);
            return;
        }
     
        // Permanently Deleting Appointment
        // Confirmation Prompted
        alertDispatch({
            type: AlertActionType.AddConfirmation,
            addConfirmation: {
                message: 'This action permanently deletes the selected appointment(s). Are you sure you want to delete the selected appointment(s)?',
                agreeLabel: 'Delete Appointments',
                disagreeLabel: 'Cancel',
                onAgree: async () => {
                    alertDispatch({
                        type: AlertActionType.CloseConfirmation
                    });
                    deleteAppointments(appointmentIDs);
                },
                onDisagree: () => {
                    alertDispatch({
                        type: AlertActionType.CloseConfirmation
                    });
                }
            }
        });
    }

    const restoreAppointmentsHandler = async (appointmentIds: Array<string>) => {
        const restoredAppointmentIds: Array<string> = [];

        // Delete Appointments
        for (const appointmentId of appointmentIds) {
            try {
                const output = await Restore({
                    SessionID: context.Employee.SessionID, 
                    AppointmentID: appointmentId
                });

                if (!output)
                    throw 'Failed to Restore Appointment';

                restoredAppointmentIds.push(appointmentId);
            }
            catch (err) {
                break;
            }
        }

        // Lengths of Appointment IDs and Deleted Appointment IDs
        const lengthA = appointmentIds.length;
        const lengthD = restoredAppointmentIds.length;

        // Update Controller
        setController({
            ...controller,
            All: {
                ...controller.All,
                Appointments: controller.All.Appointments.filter(({AppointmentID}) => !restoredAppointmentIds.includes(AppointmentID)),
                Count: controller.All.Count - lengthD,
            },
            Loading: true,
            Loaded: false
        });

        // Show Message
        alertDispatch({
            type: AlertActionType.AddMessage, 
            addMessage: {
                message: restoreMessage(lengthA, lengthD),
                messageType: lengthA === lengthD ?  MessageType.Success : MessageType.Error
            }
        });
    }

    return (
        <PageContext.Provider value={context}>
            <div>
                {/* Displaying Confirmation */}
                {alert.confirmation && alert.confirmation}

                {/* Displaying Messages */}
                {alert.messages.map(([message], i) => <div key={i}>{message}</div>)}

                {context.Loaded && 
                    <>
                        <Action
                            showingDeleted={!!filter.Deleted}
                            checkedAppointments={controller.Current.Checked}
                            loadAppointments={async () => await loadAllAppointments(filter)}
                            deleteAppointments={deleteAppointmentsHandler}
                            restoreAppointments={restoreAppointmentsHandler}
                        />
                        <Search
                            onChange={value => setFilter({...filter, Search: value})}
                            onSearch={async () => await loadAllAppointments(filter)}
                        />
                        <Tabs
                            updateFilter={async (_filter) => {
                                const updatedFilter = {...filter, ..._filter};
                                setFilter(updatedFilter);
                                await loadAllAppointments(updatedFilter);
                            }}
                        />
                    </>
                }
                {controller.Loaded &&
                    <div>
                        <table>
                            <Head
                                filter={filter}
                                updateFilter={async (filter) => {
                                    setFilter(filter);
                                    await loadAllAppointments(filter);
                                }}
                                currentAppointments={controller.Current.Appointments}
                                checkedAppointments={controller.Current.Checked}
                                updateChecked={(checked) => setController({
                                    ...controller, 
                                    Current: {
                                        ...controller.Current,
                                        Checked: checked
                                    }
                                })}
                            />
                            <Body
                                current={controller.Current.Appointments}
                                checkedAppointments={controller.Current.Checked}
                                updateChecked={(checked) => setController({
                                    ...controller, 
                                    Current: {
                                        ...controller.Current,
                                        Checked: checked
                                    }
                                })}
                                allLabels={controller.All.Labels}
                                updateLabels={(labels) => setController({
                                    ...controller, 
                                    All: {
                                        ...controller.All,
                                        Labels: labels
                                    }
                                })}
                                openAppointment={(appointmentID) => {
                                    setOpenAptID(appointmentID);
                                }}
                                deleteAppointment={deleteAppointmentsHandler}
                                search={filter.Search}
                            />
                        </table>
                        
                    </div>
                }
                {controller.Loaded &&
                    <Navigation
                        currentPageIndex={controller.Current.Page}
                        currentPageLength={controller.Current.Appointments.length}
                        pageSize={filter.PageSize}
                        allCount={controller.All.Count}
                        goForward={() => {
                            if (controller.Current.Page + 1 >= Math.ceil(controller.All.Count/filter.PageSize))
                                return;

                            setController({
                                ...controller, 
                                Current: {
                                    ...controller.Current,
                                    Page: controller.Current.Page + 1
                                }
                            });
                        }}
                        goBackward={() => {
                            if (controller.Current.Page - 1 === 0)
                                return;

                            setController({
                                ...controller, 
                                Current: {
                                    ...DefaultController.Current,
                                    Page: controller.Current.Page - 1
                                }
                            });
                        }}
                    />
                }
                {!!openAptID &&
                    <Overview
                        aptID={openAptID}
                        onClose={() => setOpenAptID('')}
                    />
                }
            </div>
        </PageContext.Provider>
    )
}