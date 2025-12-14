import { FormData, FormTest } from "@/features/Form/useForm/Form";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { useEffect, useState } from "react";
import useThingsManager from "./useThingsManager";

export interface UseThingManagerProps<BaseThing, Thing, MappedThings> {
    thingID: string;
    thingsManager: ReturnType<typeof useThingsManager>;
}

export default function useThingManager<BaseThing, Thing, MappedThings>(props: UseThingManagerProps<BaseThing, Thing, MappedThings>) {
    // This contains the data and state for a single Thing.
    // The data in which it contains is the most recent, if
    // the user saves their updates, we will update the ThingsManager
    // version of this Thing.
    const thingForm = useForm(props.thingID);
    const [thingFormData, setThingFormData] = useState<FormData>();
    const [thingFormTest, setThingFormTest] = useState<FormTest>();

    useEffect(() => {
        const thingFormData = (props.thingsManager.thingForms as any)[props.thingID].data;
        const thingFormTest = (props.thingsManager.thingForms as any)[props.thingID].test;
        setThingFormData(thingFormData);
        setThingFormTest(thingFormTest);
    }, [props.thingsManager.thingForms]);

    useEffect(() => {
        if (!thingFormData || !thingFormTest)
            return;
        
        thingForm.resetForm({
            "data": thingFormData,
            "test": thingFormTest
        });

        const state =  parseInt(props.thingID) < 0 ? null : thingForm.getState(false);
        props.thingsManager.thingsManagerForm.setInputState(props.thingID, [state, ""]);
    }, []);

    useEffect(() => {
        if (!thingFormData || !thingFormTest)
            return;

        const thingFormData1 = JSON.stringify(thingForm.getData());
        const thingFormData2 = JSON.stringify(thingFormData);
        
        if (thingFormData1 === thingFormData2) {
            return;
        }

        thingForm.resetForm({
            "data": thingFormData,
            "test": thingFormTest
        });
    }, [thingFormData]);

    const updateInputValue = async (inputName: string, inputValue: any) => {
        thingForm.updateInputData(inputName, inputValue);
        props.thingsManager.thingsManagerForm.setInputState(
            props.thingID, 
            [thingForm.getState(false), ""]
        );
        props.thingsManager.updateThingFormData(props.thingID, thingForm.getData());
    }

    const saveThing = async () => {
        props.thingsManager.saveThingForm(props.thingID);
    }

    const resetThing = async () => {
        props.thingsManager.resetThingForm(props.thingID);
    }

    const cancelThing = async () => {
        props.thingsManager.closeThingForm(props.thingID);
    }

    const deleteThing = async () => {
        props.thingsManager.deleteThingByForm(props.thingID);
    }

    const closeThing = async () => {
        props.thingsManager.closeThingForm(props.thingID);
    }

    return {
        thingForm,
        updateInputValue,
        saveThing,
        resetThing,
        cancelThing,
        deleteThing,
        closeThing
    }
}