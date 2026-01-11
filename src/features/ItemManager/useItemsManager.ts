import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { Define } from "@/features/ItemManager/Define";
import { useEffect, useState } from "react";
import { Tab, TabID } from "../TabManager/useTabsManager";

export interface UseItemsManagerProps<BaseItem, Item, Items> {
    item: Define<BaseItem, Item, Items>;
    itemList: Array<BaseItem>;
    
    updateManagerForm: UseForm;
    keyForUpdateManagerForm: string;

    saveAuto?: boolean;
    saveUpdates: (oldItems: Items, newItems: Items) => void;
    
    openTab: (tab: Tab) => void;
    closeTab: (tabID: TabID, filterTab?: (tab: Tab) => boolean) => void;

    handleChangesMade?: (keyForUpdateManager: string, changesMade: boolean) => void;
    doNotManageChangesMade?: boolean;
}

export default function useItemsManager<BaseItem, Item, Items>(props: UseItemsManagerProps<BaseItem, Item, Items>) {
    const itemsManagerForm = useForm(props.keyForUpdateManagerForm);
    const [oldItems, setOldItems] = useState<Items>({} as any);
    const [newItems, setNewItems] = useState<Items>({} as any);
    // These are items that are "open" and being worked on.
    const [tempItems, setTempItems] = useState<{[itemID: string]: Item}>({});
    const [counter, setCounter] = useState(-1);


    useEffect(() => {
        resetUpdates();
    }, [props.itemList]);


    useEffect(() => {
        if (props.saveAuto && JSON.stringify(oldItems) !== JSON.stringify(newItems)) {
            saveUpdates();
        }
        
        if (props.handleChangesMade && !props.doNotManageChangesMade)  {
            const changesMade = JSON.stringify(oldItems) !== JSON.stringify(newItems);
            props.handleChangesMade(props.keyForUpdateManagerForm, changesMade);
        }
    }, [newItems]);


    const insertNewItem = (item: Item) => {
        const updatedItems = {...newItems} as any;
        const itemID = (item as any)[props.item.itemID];
        updatedItems[itemID] = {...item};
        setNewItems(updatedItems);
    }


    const deleteNewItem = (itemID: string) => {
        const updatedItems = {...newItems} as any;
        delete updatedItems[itemID];
        setNewItems(updatedItems);
    }


    const insertTempItem = (itemID: string, item: Item) => {
        const updatedTemps = {...tempItems};
        updatedTemps[itemID] = item;
        setTempItems(updatedTemps);
    }


    const deleteTempItem = (itemID: string) => {
        const updatedTemps = {...tempItems};
        delete updatedTemps[itemID];
        setTempItems(updatedTemps);
    }


    const getNewItemID = () => {
        const itemID = counter.toString();
        setCounter(c => c - 1);
        return itemID;
    }


    const buildNewItem = (itemID: string) => {
        const item = props.item.buildItem(null);
        (item as any)[props.item.itemID] = itemID;
        return item;
    }


    const saveUpdates = () => {
        const state = itemsManagerForm.getState();
        props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [state, ""]);
        if (!state)
            throw new Error();
        props.saveUpdates(oldItems, newItems);
    }


    const resetUpdates = () => {
        const items = props.item.buildItems(props.itemList);
        setOldItems(items);
        setNewItems(items);
        itemsManagerForm.resetForm();
        props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [null, ""]);
    }


    const openTabToCreateItem = (itemID: string) => {
        props.openTab({
            id: {
                itemsManagerKey: props.keyForUpdateManagerForm,
                itemID: itemID
            },
            header: `Create New ${props.item.itemName}`,
            form: {
                key: props.keyForUpdateManagerForm, 
                itemID: itemID,
                header: `Create New ${props.item.itemName}`,
                mutation: "Create",
                canDelete: false
            }
        });
    }


    const openTabToUpdateItem = (itemID: string) => {
        props.openTab({
            id: {
                itemsManagerKey: props.keyForUpdateManagerForm,
                itemID: itemID
            },
            header: parseInt(itemID) < 0 ? `Update New ${props.item.itemName}` : `Update ${props.item.itemName} #${itemID}`,
            form: {
                key: props.keyForUpdateManagerForm, 
                itemID: itemID, 
                header: parseInt(itemID) < 0 ? `Update New ${props.item.itemName}` : `Update ${props.item.itemName} #${itemID}`,
                mutation: "Update",
                canDelete: true
            }
        });
    }


    const closeTabForItem = (itemID: string) => {
        props.closeTab({
            itemsManagerKey: props.keyForUpdateManagerForm,
            itemID: itemID
        });
    }


    const startCreateEditor = () => {
        const itemID = getNewItemID();
        const item = buildNewItem(getNewItemID());
        insertTempItem(itemID, item);
        openTabToCreateItem(itemID);
    }


    const startUpdateEditor = (itemID: string) => {
        const item: Item = (newItems as any)[itemID];
        insertTempItem(itemID, item);
        openTabToUpdateItem(itemID);
    }


    const closeEditor = (itemID: string) => {
        closeTabForItem(itemID);
        deleteTempItem(itemID);
    }


    const saveItemInEditor = (itemID: string) => {
        const item: Item = (tempItems as any)[itemID];
        insertNewItem(item);
        closeEditor(itemID);
    }

    
    const resetItemInEditor = (itemID: string) => {
        const created = parseInt(itemID) < 0;
        if (created) {
            const item: Item = buildNewItem(itemID);
            insertTempItem(itemID, item);
        }
        else {
            const item: Item = (newItems as any)[itemID];
            insertTempItem(itemID, item);
        }
    }


    const deleteItemByEditor = (itemID: string) => {
        deleteNewItem(itemID);
        closeEditor(itemID);
        itemsManagerForm.deleteInput(itemID);
        props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [itemsManagerForm.getState(), ""]);
    }


    const deleteItemByDisplay  = (itemID: string) => {
        deleteNewItem(itemID);
        if (itemID in tempItems) {
            closeEditor(itemID);
            itemsManagerForm.deleteInput(itemID);
            props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [itemsManagerForm.getState(), ""]);
        }
    }


    return {
        item: props.item,
        itemsManagerForm,
        updateManagerForm: props.updateManagerForm,
        keyForUpdateManagerForm: props.keyForUpdateManagerForm,
        oldItems,
        newItems,
        tempItems,
        setNewItems,
        getNewItemID,
        buildNewItem,
        saveUpdates,
        resetUpdates,
        deleteNewItem,
        insertNewItem,
        insertTempItem,
        deleteTempItem,
        startCreateEditor,
        startUpdateEditor,
        closeEditor,
        saveItemInEditor,
        resetItemInEditor,
        deleteItemByEditor,
        deleteItemByDisplay,
        openTab: props.openTab
    }
}