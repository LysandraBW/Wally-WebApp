"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import useForm from "@/features/Form/useForm/useForm";
import { Event, Events, buildEventUpdates, DefineEvent } from "./_DEF";
import SelectEvents from "@/services/DB/Employee/SelectEvents";
import { UpdateEmployeeEvents } from "@/services/DB/Employee/UpdateEmployeeEvents";
import { Event as DB_Event } from "waltronics-types";
import { useContext, useEffect, useReducer, useState } from "react";
import { EmployeeContext } from "../layout";
import useEventsManager from "./useEventsManager";
import EventManager from "./EventManager";
import EventModal from "./EventModal";
import EventDisplay from "./EventDisplay";
import getEventsWhen from "./getEventsWhen";
import Calendar from "./Calendar";
import CalendarSearch from "./CalendarSearch";
import clsx from "clsx";
import useTabsManager, { Tab } from "@/features/TabManager/useTabsManager";
import Plus from "@/component/Icons/Icons/PlusIcon";

export interface EventsTab extends Tab {
    event?: {
        eventID: string;
    };
    events?: {
        year: number;
        monthIndex: number;
        dateIndex: number;
    }
}

export default function EventsManager() {
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [events, setEvents] = useState<Array<DB_Event>>([]);
    const updateManagerForm = useForm("Calendar");
    const tabsManager = useTabsManager<EventsTab>();
    const employeeContext = useContext(EmployeeContext);
    

    useEffect(() => {
        refresh();
    }, []);


    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Calendar");
    }, [employeeContext]);


    const eventsManager = useEventsManager({
        item: new DefineEvent(),
        itemList: events,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: "Event",
        saveAuto: true,
        saveUpdates: async (oldItems: Events, newItems: Events) => {
            const updates = buildEventUpdates(oldItems, newItems);
            const output = await UpdateEmployeeEvents(updates);
            alertMessage(output);
        },
        alertDispatch,
        openTab: tabsManager.openTab,
        closeTab: tabsManager.closeTab,
        filterTabs: tabsManager.filterTabs
    });


    const refresh = async () => {
        const events = await SelectEvents();
        console.log(events);
        setEvents(events);
    }


    const alertMessage = async (good: boolean) => {
        const key = randomKey();

        if (good) {
            const dispatch = saveTDispatch(key, alertDispatch);
            alertDispatch(dispatch);
            await refresh();
        }
        else {
            const dispatch = saveFDispatch(key, alertDispatch)
            alertDispatch(dispatch);
        }
    }


    return (
        <div className="flex flex-col overflow-x-clip grow">
            <Alert
                alert={alert}
            />
            <div className="flex grow">
                <div className="p-4 flex flex-col grow gap-4">
                    <div className="flex flex-col gap-4 row-start-1 row-span-1 col-start-1 w-full grow">
                        <div className="w-full flex justify-between">
                            <CalendarSearch
                                year={eventsManager.year}
                                monthIndex={eventsManager.monthIndex}
                                goToNextMonth={eventsManager.goToNextMonth}
                                goToPrevMonth={eventsManager.goToPrevMonth}
                                onYearChange={eventsManager.setYear}
                                onMonthChange={eventsManager.setMonthIndex}
                            />
                            <button 
                                className={clsx(
                                    "w-full max-w-[10rem] !h-[26px]",
                                    "p-4 py-2 bg-white rounded",
                                    "border border-gray-300 hover:stroke-black hover:fill-blue-500 stroke-gray-400 fill-gray-400 hover:text-black",
                                    "hover:border hover:bg-gray-50",
                                    "fill-gray-300 stroke-gray-300",
                                    "shadow-sm flex items-center justify-center gap-2"
                                )}
                                onClick={eventsManager.startCreateEditor}
                            >
                                <Plus/>
                            </button>
                        </div>
                        <Calendar
                            year={eventsManager.year}
                            monthIndex={eventsManager.monthIndex}
                            events={eventsManager.newItems}
                            onOpenEvent={eventsManager.openEvent}
                            onOpenEvents={eventsManager.openEvents}
                        />
                    </div>
                </div>
                <div>
                    {tabsManager.tabs && (
                        <>
                            {
                                tabsManager.tabs.map((tab, i) => (
                                    <div key={i} onClick={() => tabsManager.openTab(tab)}>
                                        {tab.header}
                                    </div>
                                ))
                            }
                            {tabsManager.currentTab && (
                                <>
                                    {tabsManager.currentTab.form &&
                                        <EventManager
                                            itemsManager={eventsManager as any}
                                            itemID={tabsManager.currentTab.form.itemID}
                                            header={tabsManager.currentTab.form.header}
                                            canDelete={tabsManager.currentTab.form.canDelete}
                                        />
                                    }
                                    {tabsManager.currentTab.event &&
                                        <EventModal
                                            event={eventsManager.newItems[tabsManager.currentTab.event.eventID]}
                                            onClose={eventsManager.closeOpenedEventTab}
                                            onUpdate={eventsManager.startUpdateEditor}
                                            onDelete={eventsManager.deleteFromOpenedEvent}
                                        />
                                    }
                                    {tabsManager.currentTab.events &&
                                        <EventDisplay
                                            items={eventsManager.newItems}
                                            year={tabsManager.currentTab.events.year}
                                            monthIndex={tabsManager.currentTab.events.monthIndex}
                                            dateIndex={tabsManager.currentTab.events.dateIndex}
                                            onClose={eventsManager.closeOpenedEventsTab}
                                            onUpdate={eventsManager.startUpdateEditor}
                                            onDelete={eventsManager.deleteFromOpenedEvents}
                                        />
                                    }
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}