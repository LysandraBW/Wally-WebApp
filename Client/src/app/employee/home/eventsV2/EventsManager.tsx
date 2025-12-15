import CalendarSearch from "@/pages/employee/events/CalendarSearch";
import Calendar from "@/pages/employee/events/Calendar";
import useEventsManager from "./useEventsManager";
import clsx from "clsx";
import EventModal from "@/pages/employee/events/EventModal";
import EventDisplay from "@/pages/employee/events/EventDisplay";

interface EventsManagerProps {
    eventsManager: ReturnType<typeof useEventsManager>;
}

export default function EventsManager(props: EventsManagerProps) {
    return (
        <div className="flex flex-col gap-4 row-start-1 row-span-1 col-start-1 w-full grow">
            {(props.eventsManager.openedEvent) &&
                <div className="max-w-[440px]">
                    <EventModal
                        event={props.eventsManager.openedEvent}
                        onClose={props.eventsManager.closeOpenedEvent}
                        onUpdate={props.eventsManager.handleUpdateItem}
                        onDelete={props.eventsManager.deleteFromOpenedEvent}
                    />
                </div>
            }
            {(props.eventsManager.openedEvents && !!Object.keys(props.eventsManager.openedEvents|| {}).length) &&
                <EventDisplay
                    year={props.eventsManager.year}
                    monthIndex={props.eventsManager.monthIndex}
                    dateIndex={props.eventsManager.dateIndex}
                    items={props.eventsManager.openedEvents}
                    onClose={props.eventsManager.closeOpenedEvents}
                    onUpdate={props.eventsManager.handleUpdateItem}
                    onDelete={props.eventsManager.deleteFromOpenedEvents}
                />
            }
            <div className="w-full flex justify-between">
                <CalendarSearch
                    year={props.eventsManager.year}
                    monthIndex={props.eventsManager.monthIndex}
                    goToNextMonth={props.eventsManager.goToNextMonth}
                    goToPrevMonth={props.eventsManager.goToPrevMonth}
                    onYearChange={props.eventsManager.setYear}
                    onMonthChange={props.eventsManager.setMonthIndex}
                />
                <button 
                    className={clsx(
                        "w-full max-w-[10rem] !h-[26px]",
                        "p-4 py-2 bg-white rounded-md",
                        "border border-gray-300 hover:stroke-black hover:fill-blue-500 stroke-gray-400 fill-gray-400 hover:text-black",
                        "hover:border hover:bg-gray-50",
                        "fill-gray-300 stroke-gray-300",
                        "shadow-sm flex items-center justify-center gap-2"
                    )}
                    onClick={props.eventsManager.handleCreateItem}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="stroke-inherit fill-inherit size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <Calendar
                year={props.eventsManager.year}
                monthIndex={props.eventsManager.monthIndex}
                events={props.eventsManager.newItems}
                onOpenEvent={props.eventsManager.openEvent}
                onOpenEvents={props.eventsManager.openEvents}
                closeOpenedEvent={props.eventsManager.closeOpenedEvent}
                closeOpenedEvents={props.eventsManager.closeOpenedEvents}
            />
        </div>
    )
}