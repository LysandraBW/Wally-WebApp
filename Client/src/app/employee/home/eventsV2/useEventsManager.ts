import useItemsManager, { UseItemsManagerProps } from "../updateV2/useItemsManager";
import { Event as DB_Event } from "waltronics-types";
import { Event, Events } from "@/pages/employee/events/_DEF";
import { useEffect, useState } from "react";
import getEventsWhen from "@/pages/employee/events/getEventsWhen";

const today = new Date();

export default function useEventsManager(props: UseItemsManagerProps<DB_Event, Event, Events>) {
    const itemsManager = useItemsManager(props);
    const [year, setYear] = useState(today.getFullYear());
    const [monthIndex, setMonthIndex] = useState(today.getMonth());
    const [dateIndex, setDateIndex] = useState(-1);
    const [openedEventID, setOpenedEventID] = useState("");
    const [openedEvent, setOpenedEvent] = useState<Event>();
    const [openedEvents, setOpenedEvents] = useState<Events>();

    useEffect(() => {
        if (openedEventID)
            openEvent(openedEventID);
        
        if (dateIndex)
            openEvents(dateIndex);
    }, [itemsManager.newItems]);

    const openEvent = (eventID: string) => {
        const event = itemsManager.newItems[eventID];
        setOpenedEventID(eventID);
        setOpenedEvent(event);
    }

    const openEvents = (dateIndex: number) => {
        setDateIndex(dateIndex);
        const events = getEventsWhen(year, monthIndex, dateIndex, itemsManager.newItems);
        setOpenedEvents(events);
    }

    const closeOpenedEvent = () => {
        setOpenedEvent(undefined);
        setOpenedEventID("");
    }

    const closeOpenedEvents = () => {
        setDateIndex(-1);
        setOpenedEvents(undefined);
    }

    const deleteFromOpenedEvent = (ID: string) => {
        closeOpenedEvent();
        itemsManager.deleteItem(ID);
    }

    const deleteFromOpenedEvents = (ID: string) => {
        const updated = {...openedEvents};
        delete updated[ID];
        setOpenedEvents(updated);
        itemsManager.deleteItem(ID);
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

    const handleUpdateItem = (ID: string) => {
        if (itemsManager.newItems[ID] == openedEvent) {
            closeOpenedEvent();
        }
        itemsManager.handleUpdateItem(ID);
    }

    return {
        year,
        setYear,
        monthIndex,
        dateIndex,
        setMonthIndex,
        openedEvent,
        setOpenedEvent,
        openedEvents,
        setOpenedEvents,
        openEvent,
        openEvents,
        closeOpenedEvent,
        closeOpenedEvents,
        deleteFromOpenedEvent,
        deleteFromOpenedEvents,
        goToNextMonth,
        goToPrevMonth,
        ...itemsManager,
        handleUpdateItem
    }
}