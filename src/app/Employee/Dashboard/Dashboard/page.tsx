'use client';
import { getSessionID } from "@/lib/Cookies/Cookies";
import { Delete, GetAllAppointments, GetEmployee } from "@/lib/Database/Export";
import { DB_Labels, DB_Statuses } from "@/lib/Database/Info/Info";
import { goTo } from "@/lib/Navigation/Redirect";
import { useEffect, useState } from "react";
import Message from "@/components/Pop-Up/Message/Message";
import Confirm from "@/components/Pop-Up/Confirm/Confirm";
import useInterval from "@/lib/Hook/Timer";
import Tabs from "@/views/Employee/Dashboard/Dashboard/Tabs";
import Search from "@/views/Employee/Dashboard/Dashboard/Search";
import Navigation from "@/views/Employee/Dashboard/Dashboard/Navigation";
import Head from "@/views/Employee/Dashboard/Dashboard/Head";
import Body from "@/views/Employee/Dashboard/Dashboard/Body";
import Overview from "@/views/Employee/Dashboard/Dashboard/Overview";
import { formatLabels, LoadedValues, Values } from "@/process/Employee/Dashboard/Load";
import { AppController, AppControllerStructure, Filter, FilterStructure } from "@/process/Employee/Dashboard/Form";

let ran = false;

export default function Dashboard() {
    const [values, setValues] = useState<LoadedValues>(Values);
    const [filter, setFilter] = useState<FilterStructure>(Filter);
    const [appController, setAppController] = useState<AppControllerStructure>(AppController);

    const [messages, setMessages] = useState<Array<[React.ReactNode, number]>>([]);
    const [confirmation, setConfirmation] = useState<React.ReactNode>();

    useEffect(() => {
        const start = async () => {
            const SessionID = await getSessionID();
            if (!SessionID) {
                goTo('/Employee/Login');
                return;
            }

            const labels = await DB_Labels();
            if (!labels.length)
                throw 'Label Error';

            const statuses = await DB_Statuses();
            if (!statuses.length)
                throw 'Status Error';

            const employee: any = await GetEmployee({SessionID});
            if (!employee)
                throw 'Employee Error';

            setValues({
                employee: employee,
                statuses: statuses,
                labels: formatLabels(labels),
                loaded: true
            });

            await loadApps(filter);    
        }
        if (ran) 
            return;
        start();
        ran = true;
    }, []);

    useInterval(() => {
        const msgs = [...messages].filter(msg => {
            const elapsedTime = Date.now() - msg[1];
            return elapsedTime < 10*1000;
        });
        setMessages(msgs);
    }, 1000*1);

    useEffect(() => {
        if (!appController.loading && !appController.loaded)
            return;

        const numberPages = Math.ceil(appController.allCount/filter.PageSize);
        const currentPage = Math.min(appController.currentPage, numberPages);

        const offset = (currentPage - 1) * filter.PageSize;
        const currentApps = appController.all.slice(offset, offset + filter.PageSize);

        const currentAppIDs = currentApps.map(app => app.AppointmentID);
        const checked = appController.checked.filter(appID => currentAppIDs.includes(appID));

        setAppController({
            ...appController,
            current: currentApps,
            currentPage: currentPage,
            checked: checked,
            loading: false,
            loaded: true
        });
    }, [appController.all, appController.currentPage]);

    const loadApps = async (filter: FilterStructure) => {
        const loadedApps = await GetAllAppointments({
            SessionID: await getSessionID(), 
            ...filter
        });
        if (!loadedApps)
            throw 'Apps Error';
        
        setAppController({
            ...appController,
            all: loadedApps.all,
            allLabels: loadedApps.labels,
            allCount: loadedApps.count,
            current: [],
            currentPage: 1,
            checked: [],
            loading: true,
            loaded: false
        });
    }

    const deleteApps = async (appIDs: Array<string>) => {
        const deletedApps: Array<string> = [];
        for (const appID of appIDs) {
            try {
                const output = await Delete({SessionID: await getSessionID(), AppointmentID: appID});
                if (!output)
                    throw 'Failed to Delete Appointment';
                deletedApps.push(appID);
            }
            catch (err) {
                break;
            }
        }

        setAppController({
            ...appController,
            all: appController.all.filter(({AppointmentID}) => !deletedApps.includes(AppointmentID)),
            allCount: appController.allCount - deletedApps.length,
            loading: true,
            loaded: false
        });

        if (appIDs.length === deletedApps.length)
            addMessage('Successfully Deleted Appointment(s)', 1);
        else
            addMessage('Unsuccessfully Deleted Appointment(s)', -1);
    }

    const deleteHandler = async (appIDs: Array<string>) => {
        if (!filter.Deleted) {
            await deleteApps(appIDs);
            return;
        }
        setConfirmation(
            <Confirm
                message={
                    'This action permanently deletes the selected appointment(s).'+
                    'Are you sure you want to delete the selected appointment(s)?'
                }
                agreeLabel={'Delete Appointments'}
                disagreeLabel={'Cancel'}
                onAgree={async () => deleteApps(appIDs)}
                onDisagree={() => setConfirmation(null)}
                close={() => setConfirmation(null)}
            />
        )
    }

    const addMessage = async (msg: string, state: number = 0) => {
        const message = (
            <Message
                state={state}
                message={msg}
                close={() => {
                    setMessages(messages.filter(m => m[0] !== message));
                }}
            />
        );

        setMessages([[message, Date.now()], ...messages]);
    }

    return (
        <div>
            {confirmation && confirmation}
            {messages.map((msg, i) => <div key={i}>{msg[0]}</div>)}
            {values.loaded && 
                <>
                    <div>
                        <h1>Hello {values.employee && values.employee.FName}</h1>
                    </div>
                    <div>
                        <span onClick={async () => await loadApps(filter)}>Reload</span>
                        <span onClick={async () => await deleteHandler(appController.checked)}>Delete</span>
                    </div>
                    <Search
                        onChange={(value) => setFilter({...filter, 'Search': value})}
                        onSearch={async () => await loadApps(filter)}
                    />
                    <Tabs
                        statuses={values.statuses}
                        updateFilter={async (_filter) => {
                            const updatedFilter = {...filter, ..._filter};
                            setFilter(updatedFilter);
                            await loadApps(updatedFilter);
                        }}
                    />
                </>
            }
            {!appController.loaded &&
                'Loading Apps...'
            }
            {appController.loaded &&
                <div>
                    <table>
                        <Head
                            filter={filter}
                            updateFilter={async (filter) => {
                                setFilter(filter);
                                await loadApps(filter);
                            }}
                            checked={appController.checked}
                            current={appController.current}
                            setChecked={(checked) => setAppController({...appController, checked})}
                        />
                        <Body
                            search={filter.Search}
                            setOpen={(app) => setAppController({...appController, open: app})}
                            current={appController.current}
                            deleteHandler={deleteHandler}
                            checked={appController.checked}
                            setChecked={(checked) => setAppController({...appController, checked})}
                            labelMeta={values.labels}
                            allLabels={appController.allLabels}
                            setLabels={(labels) => setAppController({...appController, allLabels: labels})}
                        />
                    </table>
                    {!appController.allCount && 'No Appointments Found'}
                    {appController.allCount &&
                        <Navigation
                            currentPageIndex={appController.currentPage}
                            currentPageLength={appController.current.length}
                            pageSize={filter.PageSize}
                            allCount={appController.allCount}
                            goForward={() => setAppController({...appController, currentPage: Math.min(appController.currentPage + 1, Math.ceil(appController.allCount/filter.PageSize))})}
                            goBackward={() => setAppController({...appController, currentPage: Math.max(1, appController.currentPage - 1)})}
                        />
                    }
                </div>
            }
            {!!appController.open &&
                <Overview
                    app={appController.open}
                    close={() => setAppController({...appController, open: null})}
                />
            }
        </div>
    )
}