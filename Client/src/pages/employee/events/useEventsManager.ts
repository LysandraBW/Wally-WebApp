
import { useEffect, useState } from "react";
import getEventsWhen from "./getEventsWhen";
import { Event, Events } from "./_DEF";
import useItemManager, { UseItemManagerProps } from "@/features/ItemManager/useItemManager";

const today = new Date();

export default function useEventsManager<DB_Event, _Event extends Event, _Events extends Events>(props: UseItemManagerProps<DB_Event, _Event, _Events>) {
    const itemManager = useItemManager(props);
    const [year, setYear] = useState(today.getFullYear());
    const [monthIndex, setMonthIndex] = useState(today.getMonth());
    const [dateIndex, setDateIndex] = useState(-1);
    const [openedEventID, setOpenedEventID] = useState("");
    const [openedEvent, setOpenedEvent] = useState<Event>();
    // const [openedEventsDateIndex, setOpenedEventsDateIndex] = useState();
    const [openedEvents, setOpenedEvents] = useState<Events>();

    useEffect(() => {
        if (openedEventID) {
            openEvent(openedEventID);
        }
        
        if (dateIndex) {
            openEvents(dateIndex);
        }
            
    }, [itemManager.newItems]);

    const openEvent = (eventID: string) => {
        const event = itemManager.newItems[eventID];
        setOpenedEventID(eventID);
        setOpenedEvent(event);
    }

    const openEvents = (dateIndex: number) => {
        setDateIndex(dateIndex);
        const events = getEventsWhen(year, monthIndex, dateIndex, itemManager.newItems);
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
        itemManager.deleteItem(ID);
    }

    const deleteFromOpenedEvents = (ID: string) => {
        const updated = {...openedEvents};
        delete updated[ID];
        setOpenedEvents(updated);
        itemManager.deleteItem(ID);
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

    const onClickUpdateItem = (ID: string) => {
        if (itemManager.newItems[ID] == openedEvent) {
            closeOpenedEvent();
        }
        itemManager.onClickUpdateItem(ID);
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
        ...itemManager,
        onClickUpdateItem
    }
}