import { Event as DB_Event } from "waltronics-types";
import Calendar from "./Calendar";
import { DefineEvent, Event, Events, buildEventUpdates } from "./_DEF";
import EventModal from "./EventModal";
import EventForm from "./EventForm";
import CalendarSearch from "./CalendarSearch";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import useEventsManager from "./useEventsManager";
import EventDisplay from "./EventDisplay";
import { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {motion, AnimatePresence} from "motion/react";

interface EventManagerProps {
    parentForm: UseForm;
    eventList: Array<DB_Event>;
    onSaveUpdates: (updates: any) => void;
}

export default function EventManager(props: EventManagerProps) {
    const defineEvent = new DefineEvent();
    const [expanded, setExpanded] = useState(false);
    const [tab, setTab] = useState("");
    const [tabs, setTabs] = useState<Array<string>>([]);

    const processUpdates = (oldItems: Events, newItems: Events) => {
        // console.log("CALLED");
        const updates = buildEventUpdates(oldItems, newItems);
        props.onSaveUpdates(updates);
    }

    const eventManager = useEventsManager({
        itemList: props.eventList,
        defineItem: defineEvent,
        parentForm: props.parentForm,
        saveAllUpdates: processUpdates,
        autoSave: true
    });

     const openTab = (tab: string) => {
        if (tabs.findIndex(t => t === tab) !== -1)
            return;
        setTabs(tabs => [...tabs, tab]);
        setTab(tab);
    }

    const closeTab = (tab: string) => {
        const formIndex = tabs.findIndex(t => t === tab);
        if (formIndex === -1)
            return;
        let updatedTab = [...tabs];
        updatedTab.splice(formIndex, 1);
        if (updatedTab.length === 0)
            setTab("");
        else if (updatedTab.length === 1)
            setTab(updatedTab[0]);
        else
            setTab(updatedTab[formIndex - 1]);
        setTabs(updatedTab);
    }

    useEffect(() => {
        if (eventManager.openedEvents) {
            openTab("Events");
        }
        else {
            closeTab("Events");
        }
    }, [eventManager.openedEvents]);

    useEffect(() => {
        if (eventManager.openedEvent) {
            openTab("Event");
        }
        else {
            closeTab("Event");
        }
    }, [eventManager.openedEvent]);

    useEffect(() => {
        if (eventManager.createID) {
            openTab("Add Event");
        }
        else {
            closeTab("Add Event");
        }
    }, [eventManager.createID]);

    useEffect(() => {
        if (eventManager.updateID) {
            openTab("Edit Event");
        }
        else {
            closeTab("Edit Event");
        }
    }, [eventManager.updateID]);

    return (
        <div className="flex flex-col grow">
            <div className="grid grid-cols-[auto_min-content]">
                <div className="flex flex-col gap-4 row-start-1 row-span-1 col-start-1 w-full grow">
                    <div className="w-full flex justify-between">
                        <CalendarSearch
                            year={eventManager.year}
                            monthIndex={eventManager.monthIndex}
                            goToNextMonth={eventManager.goToNextMonth}
                            goToPrevMonth={eventManager.goToPrevMonth}
                            onYearChange={eventManager.setYear}
                            onMonthChange={eventManager.setMonthIndex}
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
                            onClick={eventManager.onClickCreateItem}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="stroke-inherit fill-inherit size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
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
                <AnimatePresence>
                    {!!tabs.length &&
                        <motion.div 
                            key="RightHand"
                            initial={{width: "0px"}}
                            animate={{width: "400px"}}
                            exit={{width: "0px"}}
                            className="bg-white row-start-1 col-start-2 col-span-1 ml-8 relative z-100 h-fit relative overflow-hidden"
                        >
                            <div 
                                key="Tabs"
                                className="overflow-y-hidden scroll-hide overflow-x-scroll relative bg-white col-start-3 col-span-1 row-start-1 row-span-1 flex items-end relative"
                            >
                                {tabs.map((t, i) => (
                                    <div key={i} onClick={() =>{setTab(t)}} className={clsx("!min-w-fit first:border-l border-l-gray-300 overflow-x-hidden hover:bg-gray-100 cursor-pointer group border-t border-t-gray-300 h-[37.59px] flex gap-4 items-center justify-between px-4 pr-2 bg-gray-50 border-t border-t-gray-300 border-r  border-r-gray-300 rounded-tr-lg-", t === tab && "cursor-auto !pr-4 !border-r-blue-500- !border-t-blue-500- !border-b-blue-500- !bg-white relative  z-50")}>
                                        {<span className={clsx("tracking-wide text-02 text-gray-400 font-medium whitespace-nowrap group-hover:text-gray-600", t === tab && "!text-black drop-shadow-sm-")}>{t}</span>}
                                        {t !== tab &&
                                            <div onClick={(event) => {event.stopPropagation(); closeTab(t)}} className={clsx("p-[2px] bg-transparent cursor-pointer rounded stroke-gray-400 hover:bg-gray-200 hover:stroke-black", t === tab && "stroke-black")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-[10px] stroke-inherit">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className="">
                                {(tab === "Events" && eventManager.openedEvents) &&
                                    <EventDisplay
                                        year={eventManager.year}
                                        monthIndex={eventManager.monthIndex}
                                        dateIndex={eventManager.dateIndex}
                                        items={eventManager.openedEvents}
                                        onClose={eventManager.closeOpenedEvents}
                                        onUpdate={eventManager.onClickUpdateItem}
                                        onDelete={eventManager.deleteFromOpenedEvents}
                                    />
                                }
                                {(tab === "Add Event") &&
                                    <EventForm
                                        mode="Create"
                                        defineItem={defineEvent}
                                        mutateItem={eventManager.toCreateItem}
                                        parentForm={eventManager.form}
                                        onCancel={eventManager.cancelCreate}
                                        onMutate={(item: Event) => {
                                            console.log("Mutate", item);
                                            eventManager.createItem(item);
                                        }}
                                        onDelete={() => {
                                            eventManager.deleteItem(eventManager.createID);
                                        }}
                                        expanded={expanded}
                                        onExpand={() => setExpanded(true)}
                                        onMinimize={() => setExpanded(false)}
                                    />
                                }
                                {(tab === "Edit Event") &&
                                    <EventForm
                                        mode="Update"
                                        defineItem={defineEvent}
                                        mutateItem={eventManager.toUpdateItem}
                                        parentForm={eventManager.form}
                                        onCancel={eventManager.cancelUpdate}
                                        onMutate={(item: Event) => {
                                            eventManager.updateItem(item);
                                        }}
                                        onDelete={() => {
                                            eventManager.deleteItem(eventManager.updateID);
                                        }}
                                        expanded={expanded}
                                        onExpand={() => setExpanded(true)}
                                        onMinimize={() => setExpanded(false)}
                                    />
                                }
                                {(tab === "Event" && eventManager.openedEvent) &&
                                    <EventModal
                                        event={eventManager.openedEvent}
                                        onClose={eventManager.closeOpenedEvent}
                                        onUpdate={eventManager.onClickUpdateItem}
                                        onDelete={eventManager.deleteFromOpenedEvent}
                                    />
                                }
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            {(eventManager.openedEvent && expanded) &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <div className="max-w-[440px]">
                        <EventModal
                            event={eventManager.openedEvent}
                            onClose={eventManager.closeOpenedEvent}
                            onUpdate={eventManager.onClickUpdateItem}
                            onDelete={eventManager.deleteFromOpenedEvent}
                        />
                    </div>
                </Cover>
            }
            {(eventManager.createID && expanded) &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <div className="max-w-[440px]">
                        <EventForm
                            mode="Create"
                            defineItem={defineEvent}
                            mutateItem={eventManager.toCreateItem}
                            parentForm={eventManager.form}
                            onCancel={eventManager.cancelCreate}
                            onMutate={(item) => {
                                eventManager.createItem(item);
                            }}
                            onDelete={() => {
                                eventManager.deleteItem(eventManager.createID);
                            }}
                            expanded={expanded}
                            onExpand={() => setExpanded(true)}
                            onMinimize={() => setExpanded(false)}
                        />
                    </div>
                </Cover>
            }
            {(eventManager.updateID && expanded) &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <div className="max-w-[440px]">
                        <EventForm
                            mode="Update"
                            defineItem={defineEvent}
                            mutateItem={eventManager.toUpdateItem}
                            parentForm={eventManager.form}
                            onCancel={eventManager.cancelUpdate}
                            onMutate={(item) => {
                                eventManager.updateItem(item);
                            }}
                            onDelete={() => {
                                eventManager.deleteItem(eventManager.updateID);
                            }}
                            expanded={expanded}
                            onExpand={() => setExpanded(true)}
                            onMinimize={() => setExpanded(false)}
                        />
                    </div>
                </Cover>
            }
        </div>    
    )
}