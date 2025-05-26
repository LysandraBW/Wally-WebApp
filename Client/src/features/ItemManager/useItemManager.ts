import useForm, { UseForm } from "../Form/useForm/useForm";
import { Define } from "./Define";
import { useEffect, useState } from "react";

export interface UseItemManagerProps<BaseItem, Item, Items> {
    itemList: Array<BaseItem>;
    defineItem: Define<BaseItem, Item, Items>;
    parentForm: UseForm;
    saveAllUpdates: (oldItems: Items, newItems: Items) => void;
    autoSave?: boolean;
}

export default function useItemManager<BaseItem, Item, Items>(props: UseItemManagerProps<BaseItem, Item, Items>) {
    const form = useForm(props.defineItem.formID);
    const [updateID, setUpdateID] = useState("");
    const [createID, setCreateID] = useState("");
    const [oldItems, setOldItems] = useState<Items>({} as Items);
    const [newItems, setNewItems] = useState<Items>({} as Items);
    const [nextCreateID, setNextCreateID] = useState(-1);
    const [toCreateItem, setToCreateItem] = useState<Item>({} as Item);
    const [toUpdateItem, setToUpdateItem] = useState<Item>({} as Item);
    const [autoSave, setAutoSave] = useState(props.autoSave);

    useEffect(() => {
        resetUpdates();
    }, [props.itemList]);

    useEffect(() => {
        if (autoSave && JSON.stringify(oldItems) !== JSON.stringify(newItems))
            saveUpdates();
    }, [newItems]);

    const saveUpdates = () => {
        const state = form.getState();
        props.parentForm.setInputState(form.fName, [state, ""]);
        if (!state)
            throw "Error in Items!";
        console.log(oldItems, newItems);
        props.saveAllUpdates(oldItems, newItems);
    }

    const resetUpdates = () => {
        const items = props.defineItem.buildItems(props.itemList);
        setOldItems(items);
        setNewItems(items);
        props.parentForm.setInputState(form.fName, [form.getState(), ""]);
    }

    const deleteItem = (ID: string) => {
        const updatedItems = {...newItems} as any;
        delete updatedItems[ID];
        setNewItems(updatedItems);
        form.deleteInput(form.fName + ID);
        props.parentForm.setInputState(form.fName, [form.getState(), ""]);

        if (ID === createID) setCreateID("");
        if (ID === updateID) setUpdateID("");
    }

    const createItem = (item: Item) => {
        const updatedItems = {...newItems} as any;
        updatedItems[createID] = item;
        setNewItems(updatedItems);
        setCreateID("");
    }

    const updateItem = (item: Item) => {
        const updatedItems = {...newItems} as any;
        updatedItems[updateID] = {...item};
        setNewItems(updatedItems);
        setUpdateID("");
    }

    const onClickCreateItem = () => {
        const createID = nextCreateID.toString();
        setCreateID(createID);
        setNextCreateID(nextCreateID => nextCreateID - 1);
        setToCreateItem({
            ...props.defineItem.buildItem(null), 
            [`${props.defineItem.itemID}`]: createID
        });
    }

    const onClickUpdateItem = (ID: string) => {
        setUpdateID(ID);
        setToUpdateItem((newItems as any)[ID]);
    }

    const cancelCreate = () => {
        setCreateID("");
        setToCreateItem({} as Item);
    }

    const cancelUpdate = () => {
        setUpdateID("");
        setToUpdateItem({} as Item);
    }

    return {
        form,
        createID,
        updateID,
        oldItems,
        newItems,
        nextCreateID,
        setCreateID,
        setUpdateID,
        setOldItems,
        setNewItems,
        setNextCreateID,
        saveUpdates,
        resetUpdates,
        createItem,
        updateItem,
        deleteItem,
        onClickUpdateItem,
        onClickCreateItem,
        toUpdateItem,
        toCreateItem,
        cancelUpdate,
        cancelCreate,
        defineItem: props.defineItem
    }
}