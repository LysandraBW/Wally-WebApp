import useItemsManager from "./useItemsManager";
import { useEffect } from "react";
import useForm from "@/features/Form/useForm/useForm";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";
import makeFormData from "@/features/Form/useForm/makeFormData";

export interface UseItemManagerProps<BaseItem, Item, Items> {
    itemID: string;
    itemsManager: ReturnType<typeof useItemsManager>;
}

export default function useItemManager<BaseItem, Item, Items>(props: UseItemManagerProps<BaseItem, Item, Items>) {
    const itemForm = useForm(props.itemsManager.keyForUpdateManagerForm + props.itemID);
    
    
    useEffect(() => {
        itemForm.setTest(props.itemsManager.item.test());
    }, []);


    useEffect(() => {
        const data = (props.itemsManager.forms as any)[props.itemID];
        if (sameMap(itemForm.getData(), data, Object.keys(data)))
            return;
        itemForm.setData(makeFormData(data));
    }, [props.itemsManager.forms]);
    
    
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