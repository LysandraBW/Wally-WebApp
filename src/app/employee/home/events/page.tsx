"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import useForm from "@/features/Form/useForm/useForm";
import { Event, Events, buildEventUpdates, DefineEvent } from "./_DEF";
import SelectEvents from "@/services/db/Employee/SelectEvents";
import { UpdateEmployeeEvents } from "@/services/db/Employee/UpdateEmployeeEvents";
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
import SecondaryButton from "@/component/Button/SecondaryButton";
import PlusIcon from "@/component/Icons/Icons/PlusIcon";
import OpenedTabs from "../../../../component/Tabs/PopUpTabs";
import { AnimatePresence, motion } from "motion/react";

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
        resizeMainContent();
        window.addEventListener("resize", resizeMainContent);
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


    const resizeMainContent = () => {
        const vNavBar = document.querySelector("#VNavBar");
        if (!vNavBar)
            return;
        const vNavBarRect = vNavBar.getBoundingClientRect();

        const mainContent = document.querySelector("#MainContent");
        if (!mainContent)
            return;

        const mainContentRect = mainContent.getBoundingClientRect();
        const mainContentHeight = vNavBarRect.bottom - mainContentRect.top;
        // (mainContent as any).style.maxHeight = `${mainContentHeight}px`;

        const mainContentElements = document.querySelectorAll("#MainContent");
        for (const element of mainContentElements) {
            (element as any).style.height = `${mainContentHeight}px`;
            (element as any).style.maxHeight = `${mainContentHeight}px`;
        }
    }


    return (
        <div className="h-full flex flex-col grow overflow-y-auto">
            <Alert
                alert={alert}
            />
            <div 
                id="MainContent"
                className="flex grow"
            >
                <div 
                    className={clsx(
                        "w-full h-full p-2",
                        "grid grid-rows-[auto_1fr] gap-y-2",
                    )}
                >
                    <div className="w-full flex justify-between">
                        <CalendarSearch
                            year={eventsManager.year}
                            monthIndex={eventsManager.monthIndex}
                            goToNextMonth={eventsManager.goToNextMonth}
                            goToPrevMonth={eventsManager.goToPrevMonth}
                            onYearChange={eventsManager.setYear}
                            onMonthChange={eventsManager.setMonthIndex}
                        />
                        <SecondaryButton
                            onClick={eventsManager.startCreateEditor}
                            className={clsx(
                                "w-[200px]",
                                "flex justify-center items-center",
                                "stroke-base-500 dark:stroke-base-400 hover:stroke-base-700"
                            )}
                        >
                            <PlusIcon
                                className="size-3 stroke-inherit"
                            />
                        </SecondaryButton>
                    </div>
                    <Calendar
                        year={eventsManager.year}
                        monthIndex={eventsManager.monthIndex}
                        events={eventsManager.newItems}
                        onOpenEvent={eventsManager.openEvent}
                        onOpenEvents={eventsManager.openEvents}
                    />
                </div>
                <AnimatePresence>
                    {!!tabsManager.tabs.length && (
                        <motion.div 
                            id="MainContent"
                            className="grow grid grid-rows-[auto_1fr] w-[400px] h-full overflow-x-clip overflow-y-clip border-l border-base-300 dark:border-base-200"
                            initial={{ width: "0px" }}
                            animate={{ width: "400px" }}
                            exit={{ width: "0px" }}
                            transition={{ 
                                duration: 0.3, 
                                ease: "easeInOut" 
                            }}
                        >
                            <OpenedTabs
                                tabsManager={tabsManager}
                                outerClassName="!border-t-0 !border-r-0 !border-l-0 !rounded-tr-md"
                                closeClassName="!rounded-tr-[5px]"
                                roundedTR={true}
                            />
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
                                            event={Object.values(eventsManager.newItems).find((event: Event) => {
                                                if (tabsManager.currentTab && "appointmentID" in tabsManager.currentTab.id) {
                                                    return event.AppointmentID === tabsManager.currentTab.id.appointmentID
                                                }
                                                if (tabsManager.currentTab && "eventID" in tabsManager.currentTab.id) {
                                                    return event.EventID === tabsManager.currentTab.id.eventID
                                                }
                                                return false;
                                            }) as any}
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}