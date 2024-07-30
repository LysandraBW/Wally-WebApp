'use client';
import { getSessionID } from "@/lib/Cookies/Cookies";
import { Delete, GetAllAppointments, GetEmployee } from "@/database/Export";
import { goTo, goToEmployeeLogin } from "@/lib/Navigation/Redirect";
import { useEffect, useReducer, useState, createContext } from "react";
import useInterval from "@/reducer/Alert/Timer";
import Head from "@/views/Employee/Dashboard/Dashboard/Table/Head";
import Body from "@/views/Employee/Dashboard/Dashboard/Table/Body";
import Overview from "@/views/Employee/Dashboard/Dashboard/Overview/Overview";
import { Context, ContextStructure } from "@/process/Employee/Dashboard/Context";
import { Controller, ControllerStructure } from "@/process/Employee/Dashboard/Controller";
import { Filter, FilterStructure } from "@/process/Employee/Dashboard/Filter";
import AlertReducer, { AlertActionType, InitialAlert } from "@/reducer/Alert/Reducer";
import { DB_Labels, DB_Statuses } from "@/database/Info/Info";
import Action from "@/views/Employee/Dashboard/Dashboard/Header/Action";
import Search from "@/views/Employee/Dashboard/Dashboard/Header/Search";
import Tabs from "@/views/Employee/Dashboard/Dashboard/Header/Tabs";
import Navigation from "@/views/Employee/Dashboard/Dashboard/Table/Navigation";
import { useSearchParams } from "next/navigation";

let ran = false;
export const PageContext = createContext(Context);

export default function Dashboard() {
    // Context
    const [context, setContext] = useState<ContextStructure>(Context);

    // Messages
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);

    // Driving Force    
    const [controller, setController] = useState<ControllerStructure>(Controller);
    const [filter, setFilter] = useState<FilterStructure>(Filter);

    // Search Parameters
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
            await loadAppointments(filter);    

            // Loading the Searched Appointment
            const searchedAppointmentID = searchParameters.get('AptID');
            if (!searchedAppointmentID)
                return;
            setController({
                ...controller, 
                Open: searchedAppointmentID
            });
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
        const currentPage = Math.min(controller.Current.Page, numberPages);

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
    }, [controller.All, controller.Current.Page]);

    const loadAppointments = async (filter: FilterStructure) => {
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
            Open: '',
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
                message: deleteMessage(lengthA, lengthA),
                messageType: lengthA === lengthA ? 'Default' : 'Error'
            }
        });
    }

    const deleteAppointmentHandler = async (appointmentIDs: Array<string>) => {
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
                onAgree: async () => deleteAppointments(appointmentIDs),
                onDisagree: () => alertDispatch({
                    type: AlertActionType.CloseConfirmation
                })
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
                            loadAppointments={async () => await loadAppointments(filter)}
                            deleteCheckedAppointments={async () => await deleteAppointmentHandler(controller.Current.Checked)}
                        />
                        <Search
                            onChange={value => setFilter({...filter, Search: value})}
                            onSearch={async () => await loadAppointments(filter)}
                        />
                        <Tabs
                            updateFilter={async (_filter) => {
                                const updatedFilter = {...filter, ..._filter};
                                setFilter(updatedFilter);
                                await loadAppointments(updatedFilter);
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
                                    await loadAppointments(filter);
                                }}
                                checkedAppointments={controller.Current.Checked}
                                currentAppointments={controller.Current.Appointments}
                                setChecked={(checked) => setController({
                                    ...controller, 
                                    Current: {
                                        ...controller.Current,
                                        Checked: checked
                                    }
                                })}
                            />
                            <Body
                                search={filter.Search}
                                openAppointment={(appointmentID) => setController({...controller, Open: appointmentID})}
                                current={controller.Current.Appointments}
                                deleteAppointment={deleteAppointmentHandler}
                                checked={controller.Current.Checked}
                                setChecked={(checked) => setController({
                                    ...controller, 
                                    Current: {
                                        ...controller.Current,
                                        Checked: checked
                                    }
                                })}
                                allLabels={controller.All.Labels}
                                setLabels={(labels) => setController({
                                    ...controller, 
                                    All: {
                                        ...controller.All,
                                        Labels: labels
                                    }
                                })}
                            />
                        </table>
                        
                    </div>
                }
                {controller.All.Count &&
                    <Navigation
                        currentPageIndex={controller.Current.Page}
                        currentPageLength={controller.Current.Appointments.length}
                        pageSize={filter.PageSize}
                        allCount={controller.All.Count}
                        goForward={() => setController({
                            ...controller, 
                            Current: {
                                ...controller.Current,
                                Page: Math.min(controller.Current.Page + 1, Math.ceil(controller.All.Count/filter.PageSize))
                            }
                        })}
                        goBackward={() => setController({
                            ...controller, 
                            Current: {
                                ...Controller.Current,
                                Page: Math.max(1, controller.Current.Page - 1)
                            }
                        })}
                    />
                }
                {controller.Loaded && !!controller.Open &&
                    <Overview
                        appointmentID={controller.Open}
                        onClose={() => setController({...controller, Open: ''})}
                    />
                }
            </div>
        </PageContext.Provider>
    )
}

export function deleteMessage(aLength: number, dLength: number) {
    // All appointments deleted.
    if (aLength - dLength === 0) {
        if (aLength === 1)
            return 'Successfully Deleted Appointment';
        else
            return `Successfully Deleted Appointments`;
    }
    // An appointment was not deleted.
    else {
        if (aLength === 1)
            return 'Unsuccessfully Deleted Appointment';
        else
            return 'Unsuccessfully Deleted Appointments';
    }
}