"use client";
import Alert from "@/features/Alert/Alert";
import alertReducer, { startAlert } from "@/features/Alert/alertReducer";
import randomKey from "@/features/Alert/randomKey";
import saveFDispatch from "@/features/Alert/saveFDispatch";
import saveTDispatch from "@/features/Alert/saveTDispatch";
import useForm from "@/features/Form/useForm/useForm";
import { Event, Events, buildEventUpdates, DefineEvent } from "./_DEF";
import SelectEvents from "@/services/DB/Employee/SelectEvents";
import { UpdateEmployeeEvents } from "@/services/DB/Employee/UpdateEmployeeEvents";
import { Event as DB_Event } from "waltronics-types";
import { useContext, useEffect, useReducer, useState } from "react";
import { EmployeeContext } from "../layout";
import { ItemManagerForm } from "../update/UpdateManager";
import EventsManager from "./EventsManager";
import useEventsManager from "./useEventsManager";
import EventManager from "./EventManager";

export default function EventUpdateManager() {
    const updateManagerForm = useForm("Calendar");
    const [alert, alertDispatch] =  useReducer(alertReducer, startAlert);
    const [events, setEvents] = useState<Array<DB_Event>>([]);
    const [itemManagerForms, setItemManagerForms] = useState<Array<ItemManagerForm<DB_Event, Event, Events>>>([]);
    const [currentItemManagerForm, setCurrentItemManagerForm] = useState<ItemManagerForm<DB_Event, Event, Events>|null>();
    const [currentItemManagerHeader, setCurrentItemManagerHeader] = useState("");
    const [currentItemManagerCanDelete, setCurrentItemManagerCanDelete] = useState(false);
    const employeeContext = useContext(EmployeeContext);
    

    useEffect(() => {
        refresh();
    }, []);


    useEffect(() => {
        employeeContext.setCurrentPage && employeeContext.setCurrentPage("Calendar");
    }, [employeeContext]);


    useEffect(() => {
        if (!currentItemManagerForm) {
            setCurrentItemManagerHeader("");
            return;
        }

        let item: string = currentItemManagerForm.itemsManagerKey;
        let action: string = currentItemManagerForm.mutation === "Update" ? "Update" : "Create"
        let itemID: string = currentItemManagerForm.itemID;
        itemID = parseInt(itemID) < 0 ? "(New)" : "#" + itemID;
        
        const formTabName = `${action} ${item} ${itemID}`;
        setCurrentItemManagerHeader(formTabName);
        setCurrentItemManagerCanDelete(currentItemManagerForm.mutation === "Update");

    }, [currentItemManagerForm]);


    const refresh = async () => {
        const events = await SelectEvents();
        setEvents(events);
    }
    

    const openForm = (itemsManagerKey: string, itemID: string, mutation: "Create"|"Update") => {
        const form: ItemManagerForm<DB_Event, Event, Events> = {itemsManagerKey, itemID, mutation};
        setItemManagerForms([...itemManagerForms, form]);
        setCurrentItemManagerForm(form);
    }


    const closeForm = (itemsManagerKey: string, itemID: string) => {
        const formIndex = itemManagerForms.findIndex(f => f.itemsManagerKey == itemsManagerKey && f.itemID == itemID);
        if (formIndex === -1)
            return;
        
        const updatedFormInfos = [...itemManagerForms];
        updatedFormInfos.splice(formIndex, 1);
        setItemManagerForms(updatedFormInfos);
        
        if (updatedFormInfos.length === 0)
            setCurrentItemManagerForm(null);
        if (updatedFormInfos.length === 1)
            setCurrentItemManagerForm(updatedFormInfos[0]);
        if (updatedFormInfos.length > 1)
            setCurrentItemManagerForm(updatedFormInfos[formIndex-1]);  
    }


    const alertMessage = async (good: boolean) => {
        console.log("alertMessage");
        const key = randomKey();
        console.log("\tgood: ", good);
        if (good) {
            const dispatch = saveTDispatch(key, alertDispatch);
            alertDispatch(dispatch);
            await refresh();
        }
        else {
            const dispatch = saveFDispatch(key, alertDispatch)
            alertDispatch(dispatch);
        }
    }


    const eventsManager = useEventsManager({
        item: new DefineEvent(),
        itemList: events,
        updateManagerForm: updateManagerForm,
        keyForUpdateManagerForm: "Event",
        saveAuto: true,
        saveUpdates: async (oldItems: Events, newItems: Events) => {
            const updates = buildEventUpdates(oldItems, newItems);
            const output = await UpdateEmployeeEvents(updates);
            alertMessage(output);
        },
        openForm,
        closeForm
    });


    return (
        <div className="flex flex-col overflow-x-clip grow">
            <Alert
                alert={alert}
            />
            {itemManagerForms &&
                itemManagerForms.map((form, i) => (
                    <div key={i} onClick={() => setCurrentItemManagerForm(form)}>
                        {form.itemsManagerKey} {form.itemID}
                    </div>
                ))
            }
            {itemManagerForms && currentItemManagerForm &&
                <EventManager
                    itemID={currentItemManagerForm.itemID}
                    itemsManager={eventsManager as any}
                    header={currentItemManagerHeader}
                    canDelete={currentItemManagerCanDelete}
                />
            }
            <div className="p-4 flex flex-col grow gap-4">
                <h6 className="font-medium leading-5">Calendar</h6>
                <EventsManager
                    eventsManager={eventsManager}
                />
            </div>
        </div>
    )
}