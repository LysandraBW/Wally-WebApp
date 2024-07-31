'use client';
import { getSessionID } from "@/lib/Cookies/Cookies";
import { GetAllEmployees, GetEmployee, GetEvents } from "@/database/Export";
import useInterval from "@/reducer/Alert/Timer";
import { goToEmployeeLogin } from "@/lib/Navigation/Redirect";
import { UpdateFormStructure, } from "@/process/Employee/Calendar/Form/Form";
import { default as CalendarElement } from "@/views/Employee/Dashboard/Calendar/Calendar";
import CreateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/EventInput";
import { createContext, useEffect, useReducer, useState } from "react";
import Search from "@/views/Employee/Dashboard/Calendar/Search";
import { Context, ContextStructure } from "@/process/Employee/Calendar/Context";
import { Controller, ControllerStructure } from "@/process/Employee/Calendar/Controller";
import DateEvents from "@/views/Employee/Dashboard/Calendar/DateEvents";
import { UpdateForm } from "@/process/Employee/Calendar/Form/Initialize";
import AlertReducer, { AlertActionType, InitialAlert } from "@/reducer/Alert/Reducer";
import UpdateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/UpdateEvent";

export const PageContext = createContext(Context);

export default function Calendar() {
    const [context, setContext] = useState<ContextStructure>(Context);
    const [controller, setController] = useState<ControllerStructure>(Controller);
    const [updateForm, setUpdateForm] = useState<UpdateFormStructure>();

    const [alert, alertDispatch] = useReducer(AlertReducer, InitialAlert);

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

            // Load Controller
            const todayDate = new Date();
            setController({
                ...controller,
                Month: todayDate.getMonth(),
                Year: todayDate.getFullYear()
            });

            // Load Update Form
            const events = await GetEvents({SessionID});
            setUpdateForm(await UpdateForm(events));
        }
        load();
    }, []);

    const changeHandler = (value: any) => {
        if (!updateForm)
            return;

        setUpdateForm({
            ...updateForm,
            current: {
                ...updateForm.current,
                Events: {
                    Events: value
                }
            }
        });
    }

    const createHandler = (value: any) => {
        if (!updateForm)
            return;

        const pseudoID = -1 + (parseInt(Object.keys(updateForm.current.Events.Events).sort()[0]) || 0);

        setUpdateForm({
            ...updateForm,
            current: {
                ...updateForm.current,
                Events: {
                    Events: {
                        ...updateForm.current.Events.Events,
                        [`${pseudoID}`]: value
                    }
                }
            }
        });
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
                        year={controller.Year}
                        month={controller.Month}
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
                </div>
                {updateForm &&
                    <div>
                        <CalendarElement
                            year={controller.Year}
                            month={controller.Month}
                            events={updateForm.current.Events}
                            onShowDate={(date) => {
                                setController({
                                    ...controller,
                                    OpenDay: date
                                })
                            }}
                            onShowEvent={(eventID) => {
                                setController({
                                    ...controller,
                                    OpenEventID: eventID
                                })
                            }}
                        />
                        {controller.OpenEventID &&
                            <UpdateEvent
                                event={updateForm.current.Events.Events[`${controller.OpenEventID}`]}
                                onClose={() => {
                                    setController({
                                        ...controller,
                                        OpenEventID: 0
                                    });
                                }}
                                onDelete={() => {
                                    let updatedValue = {...updateForm.current.Events.Events};
                                    delete updatedValue[`${controller.OpenEventID}`];
                                    changeHandler(updatedValue);
                                    
                                    setController({
                                        ...controller,
                                        OpenEventID: 0
                                    });
                                }}
                                onUpdate={(value) => {
                                    let updatedValue = {...updateForm.current.Events.Events};
                                    updatedValue[`${controller.OpenEventID}`] = value;
                                    changeHandler(updatedValue);
                                }}
                            />
                        }
                        {controller.OpenDay &&
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
                                onShowEvent={(eventID) => {
                                    setController({
                                        ...controller,
                                        OpenEventID: eventID
                                    })
                                }}
                            />
                        }
                    </div>
                }
                {controller.AddEvent &&
                    <CreateEvent
                        onChange={(value) => {
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