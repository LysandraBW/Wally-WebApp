import { Event as DB_Event } from "waltronics-types";
import { Event, Events } from "./_DEF";
import { Dispatch, useEffect, useState } from "react";
import useItemsManager, { UseItemsManagerProps } from "@/features/ItemManager/useItemsManager";
import { AlertAction } from "@/features/Alert/alertReducer";
import deleteConfirmationDispatch from "./dispatch/deleteConfirmationDispatch";
import { Tab } from "@/features/TabManager/useTabsManager";
import { EventsTab } from "./page";


const today = new Date();

export interface UseEventsManagerProps extends UseItemsManagerProps<DB_Event, Event, Events> {
    filterTabs: (filterTab: (tab: EventsTab) => boolean) => void;
    alertDispatch: Dispatch<AlertAction>;
}

export default function useEventsManager(props: UseEventsManagerProps) {
    const itemsManager = useItemsManager(props);
    const [year, setYear] = useState(today.getFullYear());
    const [monthIndex, setMonthIndex] = useState(today.getMonth());

    useEffect(() => {
        props.filterTabs((tab: EventsTab) => {
            if (tab.event && !(tab.event.eventID in itemsManager.newItems))
                return false;
            return true;
        });
    }, [itemsManager.newItems]);


    const openEvent = (eventID: string) => {
        props.openTab({
            id: {
                eventID
            },
            header: `Event #${eventID}`,
            event: {
                eventID
            }
        });
    }

    const openEvents = (dateIndex: number) => {
        props.openTab({
            id: {
                dateIndex: dateIndex,
                year: year,
                monthIndex: monthIndex,
            },
            header: `${monthIndex+1}/${dateIndex}/${year} Events`,
            events: {
                year: year,
                monthIndex: monthIndex,
                dateIndex: dateIndex
            }
        });
    }

    const closeOpenedEventTab = (eventID: string) => {
        props.closeTab({
            eventID
        });
    }

    const closeOpenedEventsTab = (year: number, monthIndex: number, dateIndex: number) => {
        props.closeTab({
            year,
            monthIndex,
            dateIndex
        });
    }


    const deleteFromOpenedEvent = (ID: string) => {
        itemsManager.deleteNewItem(ID);
        closeOpenedEventTab(ID);
    }


    const deleteFromOpenedEvents = (ID: string) => {
        itemsManager.deleteNewItem(ID);
    }


    const safelyDeleteFromOpenedEvent = (ID: string) => {
        props.alertDispatch(deleteConfirmationDispatch(() => deleteFromOpenedEvent(ID), props.alertDispatch));
    }


    const safelyDeleteFromOpenedEvents = (ID: string) => {
        props.alertDispatch(deleteConfirmationDispatch(() => deleteFromOpenedEvents(ID), props.alertDispatch));
    }

    const safelyDeleteByEditor = (ID: string) => {
        props.alertDispatch(deleteConfirmationDispatch(() => itemsManager.deleteItemByEditor(ID), props.alertDispatch));
    }


    const goToNextMonth = () => {
        if (monthIndex === 11) {
            setMonthIndex(0);
            setYear(year + 1);
            return;
        }
        setMonthIndex(monthIndex + 1);
    }


    const goToPrevMonth = () => {
        if (monthIndex === 0) {
            setMonthIndex(11);
            setYear(year - 1);
            return;
        }
        setMonthIndex(monthIndex - 1);
    }

    
    return {
        year,
        setYear,
        monthIndex,
        setMonthIndex,
        openEvent,
        openEvents,
        closeOpenedEventTab,
        closeOpenedEventsTab,
        deleteFromOpenedEvent: safelyDeleteFromOpenedEvent,
        deleteFromOpenedEvents: safelyDeleteFromOpenedEvents,
        goToNextMonth,
        goToPrevMonth,
        ...itemsManager,
        deleteItemByEditor: safelyDeleteByEditor
    }
}