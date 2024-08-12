'use client';
import { getSessionID } from "@/lib/Storage/Storage";
import { GetAllEmployees, GetEmployee, GetEvents } from "@/database/Export";
import useInterval from "@/hook/Alert/Timer";
import { InitialUpdateForm, UpdateFormStructure, } from "@/submission/Employee/Calendar/Form";
import CreateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/CreateEvent";
import { createContext, useEffect, useReducer, useState } from "react";
import Search from "@/views/Employee/Dashboard/Calendar/Calendar/CalendarSearch";
import { DefaultPageContext } from "@/process/Employee/Calendar/Context";
import AlertReducer, { AlertActionType, InitialAlert } from "@/hook/Alert/Reducer";
import UpdateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/UpdateEvent";
import { submitEventsForm } from "@/submission/Employee/Calendar/Submit";
import { DefaultController } from "@/process/Employee/Calendar/Controller";
import { goToEmployeeLogin } from "@/lib/Navigation/Navigation";
import { UpdateForm } from "@/submission/Employee/Calendar/Prepare";
import DayEvents from "@/views/Employee/Dashboard/Calendar/Events/DayEvents";
import CalendarElement from "@/views/Employee/Dashboard/Calendar/Calendar/Calendar";

export const PageContext = createContext(DefaultPageContext);
let ran = false;

export default function Calendar() {
    const [context, setContext] = useState(DefaultPageContext);
    const [controller, setController] = useState(DefaultController);
    const [updateForm, setUpdateForm] = useState<UpdateFormStructure>(InitialUpdateForm);
    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);
    const [formState, setFormError] = useState<{[formPart: string]: boolean}>({});

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

        if (updateDatabase && formState.Event) {
            submitEventsForm(
                updatedForm.reference, 
                updatedForm.current
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
            updatedForm.reference, 
            updatedForm.current
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

        const matchingEvent = Object.values({...updateForm.current.Events}).find(e => {
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
                            events={updateForm.current}
                            onShowDate={(date) => {
                                const updatedDate = new Date(controller.Date);
                                updatedDate.setDate(date);
                                setController({
                                    ...controller,
                                    Date: updatedDate,
                                    OpenedEvents: date
                                });
                            }}
                            onShowEvent={(eventID, aptID) => {
                                const matchingEvent = findMatchingEvent(eventID, aptID);
                                if (!matchingEvent)
                                    return;

                                setController({
                                    ...controller,
                                    OpenedEvent: matchingEvent
                                });
                            }}
                        />
                        {!!controller.OpenedEvent &&
                            <UpdateEvent
                                event={controller.OpenedEvent}
                                onClose={() => {
                                    setController({
                                        ...controller,
                                        OpenedEvent: null
                                    });
                                }}
                                onDelete={() => {
                                    if (!controller.OpenedEvent)
                                        return;

                                    let updatedValue = {...updateForm.current.Events};
                                    delete updatedValue[`${controller.OpenedEvent.EventID}`];
                                    changeHandler(updatedValue, true);
                                
                                    setController({
                                        ...controller,
                                        OpenedEvent: null
                                    });
                                }}
                                onUpdate={(value: any, finalUpdate: boolean = false) => {
                                    if (!controller.OpenedEvent)
                                        return;
                                    let updatedValue = {...updateForm.current.Events};
                                    updatedValue[`${controller.OpenedEvent.EventID}`] = value;
                                    changeHandler(updatedValue, finalUpdate);
                                }}
                                updateFormState={(state) => {
                                    setFormError({
                                        ...formState,
                                        'General': state
                                    });
                                }}
                            />
                        }
                        {!!controller.OpenedEvents &&
                            <DayEvents
                                date={controller.Date}
                                events={updateForm.current}
                                onClose={() => {
                                    setController({
                                        ...controller,
                                        OpenedEvents: 0
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
                                        OpenedEvent: matchingEvent
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