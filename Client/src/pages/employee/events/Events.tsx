"use client";
import { Event as DB_Event } from "waltronics-types";
import EventManager from "./EventManager";
import { useEffect, useReducer, useState } from "react";
import { EventUpdates } from "./_DEF";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import Alert from "@/features/Alert/Alert";
import useForm from "@/features/Form/useForm/useForm";
import SelectEvents from "@/services/DB/Employee/SelectEvents";
import { UpdateEmployeeEvents } from "@/services/DB/Employee/UpdateEmployeeEvents";

interface EventsProps {
    sessionID: string;
}

export default function Events(props: EventsProps) {
    const form = useForm("Calendar");
    const [events, setEvents] = useState<Array<DB_Event>>([]);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);

    useEffect(() => {
        const load = async () => {
            const events = await SelectEvents();
            setEvents(events);
        }
        load();
    }, []);
    
    const saveUpdates = async (updates: EventUpdates) => {
        // console.log(updates);
        const output = await UpdateEmployeeEvents(updates);
        if (output) alertDispatch(saveTDispatch(randomKey(), alertDispatch));
        else alertDispatch(saveFDispatch(randomKey(), alertDispatch));
    }

    return (
        <div>
            <Alert
                alert={alert}
            />
            <EventManager
                parentForm={form}
                eventList={events}
                onSaveUpdates={saveUpdates}
            />
        </div>
    )
}