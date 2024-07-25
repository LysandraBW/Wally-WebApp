'use client';
import { getSessionID } from "@/lib/Authorize/Authorize";
import { Delete, GetAllAppointments, GetEmployee, GetEmployeeLabels, UpdateLabel } from "@/lib/Database/Export";
import { Label, Labels, Statuses } from "@/lib/Database/Info/Info";
import { goTo } from "@/lib/Navigation/Redirect";
import { useEffect, useState } from "react";
import Message from "@/components/Pop-Up/Message/Message";
import Confirm from "@/components/Pop-Up/Confirm/Confirm";
import useInterval from "@/lib/Timer/Timer";
import Tabs from "@/views/Employee/Dashboard/Dashboard/Tabs";
import Search from "@/views/Employee/Dashboard/Dashboard/Search";
import Navigation from "@/views/Employee/Dashboard/Dashboard/Navigation";
import Head from "@/views/Employee/Dashboard/Dashboard/Head";
import Body from "@/views/Employee/Dashboard/Dashboard/Body";
import Overview from "@/views/Employee/Dashboard/Dashboard/Overview";
import { Meta, defaultMeta, Apps, defaultApps, Filter } from "./Meta";

let ran = false;

export default function Dashboard() {
    const [meta, setMeta] = useState<Meta>(defaultMeta);
    const [apps, setApps] = useState<Apps>(defaultApps);
    const [filter, setFilter] = useState<Filter>({
        PageNumber: 1,
        PageSize: 5
    });
    const [messages, setMessages] = useState<Array<[React.ReactNode, number]>>([]);
    const [confirmation, setConfirmation] = useState<React.ReactNode>();

    useEffect(() => {
        const start = async () => {
            const sessionID = await getSessionID();
            if (!sessionID) {
                goTo('/Employee/Login');
                return;
            }

            const labels = await Labels();
            if (!labels)
                throw 'Label Error';

            const formattedLabels: {[labelName: string]: Label} = {};
            for (const label of labels) {
                formattedLabels[label.Label] = label;
            }

            setMeta({
                employee: await GetEmployee({SessionID: sessionID}),
                statuses: await Statuses(),
                labels: formattedLabels,
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
        let updatedMessages = [...messages];
        updatedMessages = updatedMessages.filter(msg => {
            const elapsedTime = Date.now() - msg[1];
            return elapsedTime < 10*1000;
        });
        setMessages(updatedMessages);
    }, 1000*1);

    useEffect(() => {
        if (!apps.loading && !apps.loaded)
            return;

        const numberPages = Math.ceil(apps.allCount/filter.PageSize);
        const currentPage = Math.min(apps.currentPage, numberPages);

        const offset = (currentPage - 1) * filter.PageSize;
        const currentApps = apps.all.slice(offset, offset + filter.PageSize);

        const currentAppIDs = currentApps.map(app => app.AppointmentID);
        const checked = apps.checked.filter(appID => currentAppIDs.includes(appID));

        setApps({
            ...apps,
            current: currentApps,
            currentPage: currentPage,
            checked: checked,
            loading: false,
            loaded: true
        });
    }, [apps.all, apps.currentPage]);

    const loadApps = async (filter: Filter) => {
        const SessionID = await getSessionID();

        const loadedApps = await GetAllAppointments({SessionID, ...filter});
        if (!loadedApps)
            throw 'Apps Error';

        const unsortedLabels = await GetEmployeeLabels({SessionID});
        if (!unsortedLabels)
            throw 'Labels Error';

        const allLabels: {[appID: string]: {[label: string]: number}} = {};
        for (const label of unsortedLabels) {
            if (!allLabels[label.AppointmentID])
                allLabels[label.AppointmentID] = {};
            allLabels[label.AppointmentID][label.Label] = label.Value;
        }
        
        setApps({
            ...apps,
            all: loadedApps.all,
            allLabels: allLabels,
            allCount: loadedApps.count,
            current: [],
            currentPage: apps && apps.currentPage || 1,
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

        setApps({
            ...apps,
            all: apps.all.filter(({AppointmentID}) => !deletedApps.includes(AppointmentID)),
            allCount: apps.allCount - deletedApps.length,
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
            {meta.loaded && 
                <>
                    <div>
                        <h1>Hello {meta.employee && meta.employee.FName}</h1>
                    </div>
                    <div>
                        <span onClick={async () => await loadApps(filter)}>Reload</span>
                        <span onClick={async () => await deleteHandler(apps.checked)}>Delete</span>
                    </div>
                    <Search
                        onChange={(value) => setFilter({...filter, 'Search': value})}
                        onSearch={async () => await loadApps(filter)}
                    />
                    <Tabs
                        statuses={meta.statuses}
                        updateFilter={async (_filter) => {
                            const updatedFilter = {...filter, ..._filter};
                            setFilter(updatedFilter);
                            await loadApps(updatedFilter);
                        }}
                    />
                </>
            }
            {!apps.loaded &&
                'Loading Apps...'
            }
            {apps.loaded &&
                <div>
                    <table>
                        <Head
                            filter={filter}
                            updateFilter={async (filter) => {
                                setFilter(filter);
                                await loadApps(filter);
                            }}
                            checked={apps.checked}
                            current={apps.current}
                            setChecked={(checked) => setApps({...apps, checked})}
                        />
                        <Body
                            search={filter.Search}
                            setOpen={(app) => setApps({...apps, open: app})}
                            current={apps.current}
                            deleteHandler={deleteHandler}
                            checked={apps.checked}
                            setChecked={(checked) => setApps({...apps, checked})}
                            metaLabel={meta.labels}
                            allLabels={apps.allLabels}
                            setLabels={(labels) => setApps({...apps, allLabels: labels})}
                        />
                    </table>
                    {!apps.allCount && 'No Appointments Found'}
                    {apps.allCount &&
                        <Navigation
                            currentPageIndex={apps.currentPage}
                            currentPageLength={apps.current.length}
                            pageSize={filter.PageSize}
                            allCount={apps.allCount}
                            goForward={() => setApps({...apps, currentPage: Math.min(apps.currentPage + 1, Math.ceil(apps.allCount/filter.PageSize))})}
                            goBackward={() => setApps({...apps, currentPage: Math.max(1, apps.currentPage - 1)})}
                        />
                    }
                </div>
            }
            {!!apps.open &&
                <Overview
                    app={apps.open}
                    close={() => setApps({...apps, open: null})}
                />
            }
        </div>
    )
}