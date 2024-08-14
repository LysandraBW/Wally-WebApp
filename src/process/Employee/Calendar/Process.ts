import { useEffect, useState } from "react";
import { DefaultPageContext } from "./Context";
import { DefaultController } from "./Controller";
import { EventsFormStructure, UpdateEvent } from "@/submission/Employee/Calendar/Form";
import { GetAllEmployees, GetEmployee, GetEvents } from "@/database/Export";
import { InitializeEventsForm } from "@/submission/Employee/Calendar/Prepare";
import { submitEventsForm } from "@/submission/Employee/Calendar/Submit";
import { getSessionID } from "@/lib/Storage/Storage";
import { goToEmployeeLogin } from "@/lib/Navigation/Navigation";

let ran = false;

export default function useCalendar() {
    const [context, setContext] = useState(DefaultPageContext);
    const [controller, setController] = useState(DefaultController);
    const [updated, setUpdated] = useState<EventsFormStructure>();
    const [reference, setReference] = useState<EventsFormStructure>();

    useEffect(() => {
        const load = async () => {
            // Load Context
            const SessionID = await getSessionID();
            if (!SessionID) {
                goToEmployeeLogin();
                return;
            }

            const Employees = await GetAllEmployees({SessionID});
            if (!Employees)
                throw 'Employees Error';

            const Employee = await GetEmployee({SessionID});
            if (!Employee)
                throw 'Employee Error';

            setContext({
                SessionID, 
                Employee, 
                Employees
            });

            // Load Update Form
            const events = await GetEvents({SessionID});
            const eventForm = await InitializeEventsForm(Employee.EmployeeID, events);
            setUpdated(eventForm);
            setReference(eventForm);
        }
        if (ran)
            return;
        load();
        ran = true;
    }, []);

    const deleteEvent = (eventId: number) => {
        if (!updated || !controller.OpenedEvent)
            return;
        let updatedValue = {...updated.Events};
        delete updatedValue[`${eventId}`];
        setUpdated(Object.assign({}, updated, {Events: updatedValue}));
    }

    const updateEvent = (eventId: number, event: UpdateEvent) => {
        if (!updated || !controller.OpenedEvent)
            return;
        let updatedValue = {...updated.Events};
        updatedValue[`${eventId}`] = event;
        setUpdated(Object.assign({}, updated, {Events: updatedValue}));
    }

    const createEvent = (event: UpdateEvent) => {
        if (!updated)
            return;
        const eventIds = Object.keys(updated.Events).sort((a, b) => parseInt(a) - parseInt(b));
        const createdEventId = (parseInt(eventIds[0]) || 0) - 1;
        setUpdated(Object.assign({}, updated, {Events: {...updated, [`${createdEventId}`]: event}}));
    }

    const openAddEvent = () => {
        setController(Object.assign({}, controller, {AddEvent: true}));
    }

    const closeAddEvent = () => {
        setController(Object.assign({}, controller, {AddEvent: false}));
    }

    const openEvent = (eventId: number, aptId: string | null) => {
        const matchedEvent = getEvent(eventId, aptId);
        if (!matchedEvent)
            return;
        setController(Object.assign({}, controller, {OpenedEvent: matchedEvent}));
    }

    const closeOpenedEvent = () => {
        setController(Object.assign({}, controller, {OpenedEvent: null}));
    }

    const openDayEvents = (date: number) => {
        const updatedDate = new Date(controller.Date);
        updatedDate.setDate(date);
        Object.assign({}, controller, {Date: updatedDate, OpenedEvents: date});
    }

    const closeDayEvents = () => {
        setController(Object.assign({}, controller, {OpenedEvents: 0}));
    }

    const getEvent = (eventId: number, aptId: string | null) => {
        if (!updated)
            return null;

        let matchedEvent = null;
        for (const event of Object.values(updated.Events)) {
            if (!eventId)
                return event.AppointmentID === aptId;
            return event.EventID === eventId;
        }

        return matchedEvent;
    }

    const setYear = (year: number) => {
        const updatedDate = new Date(controller.Date);
        updatedDate.setFullYear(year);
        setController(Object.assign({}, controller, {Date: updatedDate}));
    }

    const setMonth = (month: number) => {
        const updatedDate = new Date(controller.Date);
        updatedDate.setMonth(month);
        setController(Object.assign({}, controller, {Date: updatedDate}));
    }

    const submitData = async () => {
        if (!reference || !updated)
            return;
        const output = await submitEventsForm(reference, updated);
        if (!output)
            throw 'Error on Submission';

        const events = await GetEvents(context);
        const form = await InitializeEventsForm(context.Employee.EmployeeID, events);
        setUpdated(form);
        setReference(form);
    }

    return {
        context,
        controller,
        updated,
        deleteEvent,
        updateEvent,
        createEvent,
        openAddEvent,
        closeAddEvent,
        openEvent,
        closeOpenedEvent,
        openDayEvents,
        closeDayEvents,
        setYear,
        setMonth,
        submitData
    }
}