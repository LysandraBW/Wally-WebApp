import { DB_Event } from "@/services/DB/Interface/Employee";
import Calendar from "./Calendar";
import { DefineEvent, Events, makeEventUpdates } from "./_DEF";
import EventModal from "./EventModal";
import EventForm from "./EventForm";
import CalendarSearch from "./CalendarSearch";
import Button from "@/component/Form/Button/Button";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import useEventsManager from "./useEventsManager";
import EventDisplay from "./EventDisplay";
import { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";

interface EventManagerProps {
    parentForm: UseForm;
    eventList: Array<DB_Event>;
    onSaveUpdates: (updates: any) => void;
}

export default function EventManager(props: EventManagerProps) {
    const defineEvent = new DefineEvent();
    
    const processUpdates = (oldItems: Events, newItems: Events) => {
        const updates = makeEventUpdates(oldItems, newItems);
        props.onSaveUpdates(updates);
    }

    const eventManager = useEventsManager({
        itemList: props.eventList,
        defineItem: defineEvent,
        parentForm: props.parentForm,
        saveAllUpdates: processUpdates
    });

    return (
        <div className="p-4">
            <h5 className="mb-4">Events</h5>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-4 row-start-1 col-start-1 col-span-2">
                    <CreateItemButton
                        onCreate={eventManager.onClickCreateItem}
                    />
                    <div className="flex justify-center">
                        <CalendarSearch
                            year={eventManager.year}
                            monthIndex={eventManager.monthIndex}
                            goToNextMonth={eventManager.goToNextMonth}
                            goToPrevMonth={eventManager.goToPrevMonth}
                            onYearChange={eventManager.setYear}
                            onMonthChange={eventManager.setMonthIndex}
                        />
                    </div>
                    <Calendar
                        year={eventManager.year}
                        monthIndex={eventManager.monthIndex}
                        events={eventManager.newItems}
                        onOpenEvent={eventManager.openEvent}
                        onOpenEvents={eventManager.openEvents}
                        closeOpenedEvent={eventManager.closeOpenedEvent}
                        closeOpenedEvents={eventManager.closeOpenedEvents}
                    />
                </div>
                {eventManager.openedEvents &&
                    <div className="bg-white row-start-1 col-start-2 col-span-1 border-l">
                        <EventDisplay
                            year={eventManager.year}
                            monthIndex={eventManager.monthIndex}
                            dateIndex={eventManager.dateIndex}
                            items={eventManager.openedEvents}
                            onClose={eventManager.closeOpenedEvents}
                            onUpdate={eventManager.onClickUpdateItem}
                            onDelete={eventManager.deleteFromOpenedEvents}
                        />
                    </div>
                }
            </div>
            {eventManager.openedEvent &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <EventModal
                        event={eventManager.openedEvent}
                        onClose={eventManager.closeOpenedEvent}
                        onUpdate={eventManager.onClickUpdateItem}
                        onDelete={eventManager.deleteFromOpenedEvent}
                    />
                </Cover>
            }
            {eventManager.createID &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <EventForm
                        mode="Create"
                        defineItem={defineEvent}
                        mutateItem={eventManager.toCreateItem}
                        parentForm={eventManager.form}
                        onCancel={eventManager.cancelCreate}
                        onMutate={eventManager.createItem}
                        onDelete={() => {
                            eventManager.deleteItem(eventManager.createID);
                        }}
                    />
                </Cover>
            }
            {eventManager.updateID &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <EventForm
                        mode="Update"
                        defineItem={defineEvent}
                        mutateItem={eventManager.toUpdateItem}
                        parentForm={eventManager.form}
                        onCancel={eventManager.cancelUpdate}
                        onMutate={eventManager.updateItem}
                        onDelete={() => {
                            eventManager.deleteFromOpenedEvent(eventManager.updateID);
                        }}
                    />
                </Cover>
            }
            <SaveResetButtons
                onSave={eventManager.saveUpdates}
                onReset={eventManager.resetUpdates}
            />
        </div>    
    )
}