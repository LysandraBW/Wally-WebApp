'use client';
import { getSessionID } from "@/lib/Cookies/Cookies";
import { GetAllEmployees, GetEmployee, GetEvents } from "@/database/Export";
import useInterval from "@/reducer/Alert/Timer";
import { goToEmployeeLogin } from "@/lib/Navigation/Redirect";
import { InitialUpdateForm, UpdateEvent as UpdateEventData, UpdateFormStructure, } from "@/process/Employee/Calendar/Form/Form";
import { default as CalendarElement } from "@/views/Employee/Dashboard/Calendar/Calendar";
import CreateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/CreateEvent";
import { createContext, useEffect, useReducer, useState } from "react";
import Search from "@/views/Employee/Dashboard/Calendar/Search";
import { Context, ContextStructure } from "@/process/Employee/Calendar/Context";
import { Controller, ControllerStructure } from "@/process/Employee/Calendar/Controller";
import DateEvents from "@/views/Employee/Dashboard/Calendar/DateEvents";
import { UpdateForm } from "@/process/Employee/Calendar/Form/Initialize";
import AlertReducer, { AlertActionType, InitialAlert } from "@/reducer/Alert/Reducer";
import UpdateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/UpdateEvent";
import { submitEventsForm } from "@/process/Employee/Calendar/Form/Submit";

export const PageContext = createContext(Context);
let ran = false;

export default function Calendar() {
    const [context, setContext] = useState<ContextStructure>(Context);
    const [controller, setController] = useState<ControllerStructure>(Controller);
    const [updateForm, setUpdateForm] = useState<UpdateFormStructure>(InitialUpdateForm);
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);
    const [formError, setFormError] = useState<{[formPart: string]: boolean}>({});

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
            
            setUpdateForm(await UpdateForm(Employee.EmployeeID, events));
        }
        if (ran)
            return;
        load();
        ran = true;
    }, []);

    const changeHandler = (value: any, updateDatabase: boolean = false) => {
        if (!updateForm)
            return;

        const updatedForm: UpdateFormStructure = {
            ...updateForm,
            current: {
                ...updateForm.current,
                Events: {
                    ...updateForm.current.Events,
                    Events: value
                }
            }
        }

        setUpdateForm(updatedForm);

        if (updateDatabase && formError.Event) {
            submitEventsForm(
                updatedForm.reference.Events, 
                updatedForm.current.Events
            );
        }
    }

    const createHandler = async (value: any) => {
        if (!updateForm)
            return;

        const eventIDs = Object.keys(updateForm.current.Events.Events).sort((a, b) => parseInt(a) - parseInt(b));
        const createdEventID = (parseInt(eventIDs[0]) || 0) - 1;

        const updatedForm: UpdateFormStructure = {
            ...updateForm,
            current: {
                ...updateForm.current,
                Events: {
                    ...updateForm.current.Events,
                    Events: {
                        ...updateForm.current.Events.Events,
                        [`${createdEventID}`]: value
                    }
                }
            }
        }

        const output = await submitEventsForm(
            updatedForm.reference.Events, 
            updatedForm.current.Events
        );

        if (!output)
            throw 'Could Not Create Event';

        // Reload
        const events = await GetEvents({...context});
        setUpdateForm(await UpdateForm(context.Employee.EmployeeID, events));
    }

    const findMatchingEvent = (eventID: number, aptID: string | null) => {
        if (!updateForm)
            return null;

        const matchingEvent = Object.values({...updateForm.current.Events.Events}).find(e => {
            if (!eventID)
                return e.AppointmentID === aptID;
            return e.EventID === eventID;
        });

        return matchingEvent;
    }

    useInterval(() => {
        alertDispatch({type: AlertActionType.RefreshMessages});
    }, 1000*1);

    return (
        <PageContext.Provider value={context}>
            {alert.confirmation && alert.confirmation}
            {alert.messages.map(message => message[0])}
            <div>
                <div>
                    <Search
                        year={controller.Date.getFullYear()}
                        month={controller.Date.getMonth()}
                        onYearChange={(year: number) => {
                            const updatedDate = new Date(controller.Date);
                            updatedDate.setFullYear(year);
                            setController({
                                ...controller,
                                Date: updatedDate
                            });
                        }}
                        onMonthChange={(month: number) => {
                            const updatedDate = new Date(controller.Date);
                            updatedDate.setMonth(month);
                            setController({
                                ...controller,
                                Date: updatedDate
                            });
                        }}
                    />
                    <button
                        onClick={() => {
                            setController({
                                ...controller,
                                AddEvent: true
                            });
                        }}
                    >
                        Add Event
                    </button>
                </div>
                {updateForm &&
                    <div>
                        <CalendarElement
                            year={controller.Date.getFullYear()}
                            month={controller.Date.getMonth()}
                            events={updateForm.current.Events}
                            onShowDate={(date) => {
                                const updatedDate = new Date(controller.Date);
                                updatedDate.setDate(date);
                                setController({
                                    ...controller,
                                    Date: updatedDate,
                                    OpenDay: date
                                });
                            }}
                            onShowEvent={(eventID, aptID) => {
                                const matchingEvent = findMatchingEvent(eventID, aptID);
                                if (!matchingEvent)
                                    return;

                                setController({
                                    ...controller,
                                    OpenEvent: matchingEvent
                                });
                            }}
                        />
                        {!!controller.OpenEvent &&
                            <UpdateEvent
                                event={controller.OpenEvent}
                                onClose={() => {
                                    setController({
                                        ...controller,
                                        OpenEvent: null
                                    });
                                }}
                                onDelete={() => {
                                    if (!controller.OpenEvent)
                                        return;

                                    let updatedValue = {...updateForm.current.Events.Events};
                                    delete updatedValue[`${controller.OpenEvent.EventID}`];
                                    changeHandler(updatedValue, true);
                                    
                                    setController({
                                        ...controller,
                                        OpenEvent: null
                                    });
                                }}
                                onUpdate={(value: any, finalUpdate: boolean = false) => {
                                    if (!controller.OpenEvent)
                                        return;

                                    let updatedValue = {...updateForm.current.Events.Events};
                                    updatedValue[`${controller.OpenEvent.EventID}`] = value;
                                    changeHandler(updatedValue, finalUpdate);
                                }}
                                updateFormError={(state) => {
                                    setFormError({
                                        ...formError,
                                        'General': state
                                    });
                                }}
                            />
                        }
                        {!!controller.OpenDay &&
                            <DateEvents
                                date={controller.Date}
                                events={updateForm.current.Events}
                                onClose={() => {
                                    setController({
                                        ...controller,
                                        OpenDay: 0
                                    });
                                }}
                                onAddEvent={() => {
                                    setController({
                                        ...controller,
                                        AddEvent: true
                                    });
                                }}
                                onShowEvent={(eventID, aptID) => {
                                    const matchingEvent = findMatchingEvent(eventID, aptID);
                                    if (!matchingEvent)
                                        return;
                                
                                    setController({
                                        ...controller,
                                        OpenEvent: matchingEvent
                                    })
                                }}
                            />
                        }
                    </div>
                }
                {controller.AddEvent &&
                    <CreateEvent
                        onClose={() => {
                            setController({
                                ...controller,
                                AddEvent: false
                            });
                        }}
                        onCreate={(value) => {
                            createHandler(value);
                            setController({
                                ...controller,
                                AddEvent: false
                            });
                        }}
                    />
                }
            </div>
        </PageContext.Provider>
    )
}