/*
BaseThing:     
The thing as it is represented in the database.

Thing:
The thing as it is represented after being processed.
We format the base thing to make it easier for
us to use.

MappedThings: 
A dictionary wherein the key is a thing's ID and the
value is the corresponding thing.
*/

import { Form, FormData, FormTest } from "@/features/Form/useForm/Form";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { JSX, ReactNode, useCallback, useEffect, useState } from "react";
import makeForm from "@/features/Form/useForm/makeForm";
import { Data } from "@/features/Form/useForm/Input";
import { ThingManagerProps } from "./ThingManager";
import { Define } from "./Define";

export interface UseThingsManagerProps<BaseThing, Thing, MappedThings> {
    baseThings: Array<BaseThing>;
    // Contains the aggregate states of each type
    // of Thing, whether that be Service-Things or
    // Part-Things.
    updateManagerForm: UseForm;
    // The key used to index this ThingsManager's
    // state data within the UpdateManager's form.
    // We'll also use it to identify the different
    // Thing managers (i.e., "Part", "Repair").
    thingsManagerKey: string; 
    thingDefinition: Define<BaseThing, Thing, MappedThings>;
    // This is a function that will be called to save the changes
    saveUpdates: (oldThings: MappedThings, newThings: MappedThings) => void;
    autoSave?: boolean;
    // We call this function to open a tab for a form and
    // pass all the other required information. The element
    // will be constructed in the parent.
    openForm: (thingsManagerKey: string, thingID: string, formTabName: string, Form: (props: ThingManagerProps<BaseThing, Thing, MappedThings>) => JSX.Element, FormSubProps: {header: string; canDelete: boolean}) => void;
    closeForm: (thingsManagerKey: string, thingID: string) => void;
    // This is the form that will be opened for each Thing.
    Form: (props: ThingManagerProps<BaseThing, Thing, MappedThings>) => JSX.Element;
}

export default function useThingsManager<BaseThing, Thing, MappedThings>(props: UseThingsManagerProps<BaseThing, Thing, MappedThings>) {
    // This form manages the inputs and states of each of its "things".
    // So, expect to see something like {"1": {...}, "2": {...}}; each key is
    // the ID of a Thing and each value is the corresponding Thing.
    const thingsManagerForm = useForm(props.thingsManagerKey);
    const [oldThings, setOldThings] = useState<MappedThings>({} as MappedThings);
    const [newThings, setNewThings] = useState<MappedThings>({} as MappedThings);

    // This is a counter, we use the number as an ID when creating
    // new Things, so that there's no duplicate IDs.
    const [counter, setCounter] = useState(-1);

    // Each Thing is associated with a Form. These objects store the
    // updated data. When the Form is saved, newThings is updated. In this way,
    // we can (1) keep track of the Thing's initial data; and (2) maintain state
    // even when the form is not actively showing.
    const [thingForms, setThingForms] = useState<{[thingID: string]: Form}>();

    useEffect(() => {
        resetUpdates();
    }, []);

    useEffect(() => {
        console.log("thingForms:", thingForms);
    }, [thingForms]);

    const saveUpdates = () => {
        const state = thingsManagerForm.getState();
        props.updateManagerForm.setInputState(props.thingsManagerKey, [state, ""]);

        if (state === false)
            throw "ERROR";

        props.saveUpdates(oldThings, newThings);
    }

    const resetUpdates = () => {
        props.updateManagerForm.setInputState(props.thingsManagerKey, [thingsManagerForm.getState(), ""]);
        const things = props.thingDefinition.processBaseThings(props.baseThings);
        setOldThings(things);
        setNewThings(things);
    }

    // Delete Thing from newThings
    const deleteThing = (thingID: string) => {
        console.log("HERE, HERE, HERE?")
        const updatedThings = {...newThings} as any;
        delete updatedThings[thingID];
        setNewThings(updatedThings);
    }

    // Save Thing to newThings
    const saveThing = (thing: Thing) => {
        const updatedThings = {...newThings} as any;
        const thingID  = (thing as any)[props.thingDefinition.thingIDName];
        updatedThings[thingID] = {...thing};
        setNewThings(updatedThings);
    }

    // Create New (and Empty) Thing
    const createNewThing = (thingID: string): Thing => {
        const thing: Thing = {
            ...props.thingDefinition.processBaseThing(null), 
            [props.thingDefinition.thingIDName]: thingID
        }
        return thing;
    }

    const addThingForm = useCallback((thingID: string, thing: Thing) => {
        setThingForms(thingForms => {
            console.log("addThingForm");

            const thingForm = makeForm(<Data> thing, props.thingDefinition.thingTest());
            console.log("\tthingForm", thingForm);

            const updatedThingForms = {...thingForms} as any;
            updatedThingForms[thingID] = thingForm;

            console.log("\tupdatedThingsForm", updatedThingForms);

            return updatedThingForms;
        });
    }, []);

    // When the user wants to create a Thing,
    // we must create a Thing and an accompanying
    // form.
    const openCreateThingForm = () => {
        // We create a new Thing, giving it a new ID.
        // The ID is a simple negative number generated 
        // by this counter.
        const thingID = counter.toString();
        const thing: Thing = createNewThing(thingID);

        // We update the counter for the next Thing.
        setCounter(counter => counter - 1);
        addThingForm(thingID, thing);
        props.openForm(
            props.thingsManagerKey, 
            thingID, 
            `Create ${props.thingDefinition.thingName} ${thingID}`, 
            props.Form,
            {
                header: "",
                canDelete: false
            }
        );
    }

    // When the user wants to update a Thing,
    // we must create a form.
    const openUpdateThingForm = (thingID: string) => {
        const thing: Thing = (newThings as any)[thingID];
        addThingForm(thingID, thing);
        props.openForm(
            props.thingsManagerKey, 
            thingID, 
            `Update ${props.thingDefinition.thingName} #${thingID}`, 
            props.Form,
            {
                header: "",
                canDelete: true
            }
        );
    }

    const deleteThingForm = (thingID: string) => {
        console.log("deleteThingForm");
        const updatedThingForms = {...thingForms} as any;
        delete updatedThingForms[thingID];
        setThingForms(updatedThingForms);
    }

    const updateThingFormData = useCallback((thingID: string, thing: FormData) => {
        setThingForms(thingForms => {
            console.log("updateThingFormData");
            const updatedThingForms = {...thingForms};
            console.log("\tthingID", thingID);
            console.log("\tupdatedThingForms", updatedThingForms);
            updatedThingForms[thingID].data = thing;
            return updatedThingForms;
        });
    }, []);
    
    // Close a Thing's Form
    const closeThingForm = (thingID: string) => {
        // Close the tab for the form, 
        // if any.
        props.closeForm(props.thingsManagerKey, thingID);
        deleteThingForm(thingID);
    }
    
    // Delete Thing from Form: Delete Thing, 
    // Handle Form and Cleaning
    const deleteThingByForm = (thingID: string) => {
        deleteThing(thingID);
    
        // We delete the Thing from our thingsUpdateManagerForm
        // as it no longer exists
        thingsManagerForm.deleteInput(thingID);
        props.updateManagerForm.setInputState(
            props.thingsManagerKey, 
            [thingsManagerForm.getState(), ""]
        );

       closeThingForm(thingID);
    }

    // Save Thing's Form: Add/Update Thing, Close Form
    const saveThingForm = useCallback((thingID: string) => {
        const thingForm = (thingForms as any)[thingID];
        const state = thingForm.getState();
        thingsManagerForm.setInputState(thingID, [state, ""]);

        if (!state)
            throw "Errors";
        
        const thing = thingForm.getData() as Thing;
        saveThing(thing);

        // As there may be a tab open for this thing,
        // we must close it, if it's open.
        // const thingID = (thing as any)[props.thingIDName];
        closeThingForm(thingID);
    }, [thingForms]);

    // Reset Thing's Form
    const resetThingForm = (thingID: string) => {
        const thing: Thing = createNewThing(thingID);
        addThingForm(thingID, thing);
    }

    return {
        saveUpdates,
        resetUpdates,
        deleteThing,
        saveThing,
        createNewThing,
        addThingForm,
        openCreateThingForm,
        openUpdateThingForm,
        deleteThingForm,
        updateThingFormData,
        closeThingForm,
        deleteThingByForm,
        saveThingForm,
        resetThingForm,
        counter,
        setCounter,
        newThings,
        oldThings,
        setNewThings,
        setOldThings,
        thingsManagerForm,
        thingForms,
        thingDefinition: props.thingDefinition
    }
}