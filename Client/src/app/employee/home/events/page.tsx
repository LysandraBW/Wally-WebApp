"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import useForm from "@/features/Form/useForm/useForm";
import { EventUpdates } from "@/pages/employee/events/_DEF";
import EventManager from "@/pages/employee/events/EventManager";
import Events from "@/pages/employee/events/Events";
import SelectEvents from "@/services/DB/Employee/SelectEvents";
import { UpdateEmployeeEvents } from "@/services/DB/Employee/UpdateEmployeeEvents";
import { Event as DB_Event } from "waltronics-types";
import EmployeeLayout from "@/views/Layout/Employee/EmployeeLayout";
import { Pages } from "@/views/Layout/Employee/VerticalNavigation";
import { useContext, useEffect, useReducer, useState } from "react";
import { EmployeeContext } from "../layout";

export default function Page() {
    const form = useForm("Calendar");
    const [events, setEvents] = useState<Array<DB_Event>>([]);
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const employeeContext = useContext(EmployeeContext);

    useEffect(() => {
        const load = async () => {
            const events = await SelectEvents();
            console.log(events);
            setEvents(events);
        }
        load();
    }, []);

    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Calendar");
    }, [employeeContext]);
    
    const saveUpdates = async (updates: EventUpdates) => {
        console.log(updates);
        const output = await UpdateEmployeeEvents(updates);
        console.log(output);
        if (output) alertDispatch(saveTDispatch(randomKey(), alertDispatch));
        else alertDispatch(saveFDispatch(randomKey(), alertDispatch));
    }

    return (
        <div className="flex flex-col overflow-x-clip grow">
            <Alert
                alert={alert}
            />
            <div className="p-4 flex flex-col grow gap-4">
                <h6 className="font-medium leading-5">Calendar</h6>
                <EventManager
                    parentForm={form}
                    eventList={events}
                    onSaveUpdates={saveUpdates}
                />
            </div>
        </div>
    )
}