'use client';
import CreateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/CreateEvent";
import { createContext } from "react";
import Search from "@/views/Employee/Dashboard/Calendar/Calendar/CalendarSearch";
import { DefaultPageContext } from "@/process/Employee/Calendar/Context";
import UpdateEvent from "@/views/Employee/Dashboard/Calendar/EventManager/UpdateEvent";
import DayEvents from "@/views/Employee/Dashboard/Calendar/Events/DayEvents";
import CalendarElement from "@/views/Employee/Dashboard/Calendar/Calendar/Calendar";
import useCalendar from "@/process/Employee/Calendar/Process";

export const PageContext = createContext(DefaultPageContext);

export default function Calendar() {
    const calendar = useCalendar();
    
    return (
        <PageContext.Provider value={calendar.context}>
            <div>
                <div>
                    {calendar.controller.Date &&
                        <Search
                            year={calendar.controller.Date.getFullYear()}
                            month={calendar.controller.Date.getMonth()}
                            onYearChange={year => calendar.setYear(year)}
                            onMonthChange={month => calendar.setMonth(month)}
                        />
                    }
                    <button onClick={calendar.openAddEvent}>Add Event</button>
                </div>
                {calendar.updated && calendar.controller &&
                    <div>
                        <CalendarElement
                            year={calendar.controller.Date.getFullYear()}
                            month={calendar.controller.Date.getMonth()}
                            events={calendar.updated}
                            onShowDate={date => calendar.openDayEvents(date)}
                            onShowEvent={(eventId, aptId) => calendar.openEvent(eventId, aptId)}
                        />
                        {!!calendar.controller.OpenedEvent &&
                            <UpdateEvent
                                event={calendar.controller.OpenedEvent}
                                onClose={calendar.closeOpenedEvent}
                                onDelete={() => {
                                    if (!calendar.controller.OpenedEvent)
                                        return;
                                    calendar.deleteEvent(calendar.controller.OpenedEvent.EventID);
                                    calendar.submitData();
                                }}
                                onUpdate={value => {
                                    if (!calendar.controller.OpenedEvent)
                                        return;
                                    calendar.updateEvent(calendar.controller.OpenedEvent.EventID, value);
                                }}
                            />
                        }
                        {!!calendar.controller.OpenedEvents &&
                            <DayEvents
                                date={calendar.controller.Date}
                                events={calendar.updated}
                                onClose={calendar.closeDayEvents}
                                onAddEvent={calendar.openAddEvent}
                                onShowEvent={(eventId, aptId) => {
                                    if (!calendar.controller.OpenedEvent)
                                        return;
                                    calendar.openEvent(eventId, aptId);
                                }}
                            />
                        }
                    </div>
                }
                {calendar.controller.AddEvent &&
                    <CreateEvent
                        onClose={calendar.closeAddEvent}
                        onChange={value => calendar.createEvent(value)}
                    />
                }
            </div>
        </PageContext.Provider>
    )
}