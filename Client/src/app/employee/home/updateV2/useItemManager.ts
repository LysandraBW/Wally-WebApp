import useItemsManager from "./useItemsManager";
import { useEffect, useState } from "react";
import useForm from "@/features/Form/useForm/useForm";
import { Data } from "@/features/Form/useForm/Input";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";
import makeFormData from "@/features/Form/useForm/makeFormData";

export interface UseItemManagerProps<BaseItem, Item, Items> {
    itemID: string;
    itemsManager: ReturnType<typeof useItemsManager>;
}

export default function useItemManager<BaseItem, Item, Items>(props: UseItemManagerProps<BaseItem, Item, Items>) {
    const itemForm = useForm(props.itemID);
    const [referenceData, setReferenceData] = useState<Data>();
    
    
    useEffect(() => {
        itemForm.setTest(props.itemsManager.item.test());
    }, []);


    useEffect(() => {
        const data = (props.itemsManager.forms as any)[props.itemID];
        setReferenceData(data);
    }, [props.itemsManager.forms]);


    useEffect(() => {
        // console.log("useEffect[referenceData]");
        // console.log("\treferenceData", referenceData);
        // console.log("\tObject.keys(referenceData)", Object.keys(referenceData || {}));
        // console.log("\titemForm.getData()", itemForm.getData());
        if (!referenceData || sameMap(itemForm.getData(), referenceData, Object.keys(referenceData)))
            return;
        itemForm.setData(makeFormData(referenceData));
        // console.log("\titemForm.setData({...})", makeFormData(referenceData));
    }, [referenceData]);


    // useEffect(() => {
    //     console.log("useEffect[itemForm]");
    //     console.log("\titemForm.getData()", itemForm.getData());
    // }, [itemForm]);


    const updateInputValue = async (inputName: string, inputValue: any) => {
        itemForm.updateInputData(inputName, inputValue);
        props.itemsManager.itemsManagerForm.setInputState(
            props.itemID, 
            [itemForm.getState(false), ""]
        );
        props.itemsManager.updateForm(props.itemID, itemForm.getData());
    }


    const saveItem = async () => {
        const state = itemForm.getState();
        // console.log("saveItem");
        // console.log("\tstate: ", state);
        props.itemsManager.itemsManagerForm.setInputState(props.itemID, [state, ""]);
        if (!state)
            return;
        props.itemsManager.saveForm(props.itemID);
    }


    const resetItem = async () => {
        props.itemsManager.resetForm(props.itemID);
    }


    const deleteItem = async () => {
        props.itemsManager.deleteItemInForm(props.itemID);
    }


    const closeItem = async () => {
        props.itemsManager.closeForm(props.itemID);
    }


    return {
        itemForm,
        updateInputValue,
        saveItem,
        closeItem,
        resetItem,
        deleteItem
    }
}