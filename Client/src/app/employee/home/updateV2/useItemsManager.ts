import { Data } from "@/features/Form/useForm/Input";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { Define } from "@/features/ItemManager/Define";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


export interface UseItemsManagerProps<BaseItem, Item, Items> {
    item: Define<BaseItem, Item, Items>;
    itemList: Array<BaseItem>;
    
    updateManagerForm: UseForm;
    keyForUpdateManagerForm: string;

    saveAuto?: boolean;
    saveUpdates: (oldItems: Items, newItems: Items) => void;
    
    openForm: (keyForUpdateManager: string, itemID: string, mutation: "Create"|"Update") => void;
    closeForm: (keyForUpdateManager: string, itemID: string) => void;

    handleChangesMade?: (keyForUpdateManager: string, changesMade: boolean) => void;
    doNotManageChangesMade?: boolean;
}

export default function useItemsManager<BaseItem, Item, Items>(props: UseItemsManagerProps<BaseItem, Item, Items>) {
    const itemsManagerForm = useForm(props.keyForUpdateManagerForm);
    const [oldItems, setOldItems] = useState<Items>({} as any);
    const [newItems, setNewItems] = useState<Items>({} as any);
    const [forms, setForms] = useState<{[itemID: string]: Item}>();
    const [counter, setCounter] = useState(-1);


    useEffect(() => {
        resetUpdates();
    }, [props.itemList]);


    useEffect(() => {
        if (props.saveAuto && JSON.stringify(oldItems) !== JSON.stringify(newItems)) {
            saveUpdates();
        }
        
        if (props.handleChangesMade && !props.doNotManageChangesMade)  {
            console.log("!props.doNotManageChangesMade")
            const changesMade = JSON.stringify(oldItems) !== JSON.stringify(newItems);
            props.handleChangesMade(props.keyForUpdateManagerForm, changesMade);
        }
    }, [newItems]);


    useEffect(() => {
        console.log("useEffect[forms]");
        console.log("\tforms: ", forms);
        console.log("\tkeyForUpdateManagerForm: ", props.keyForUpdateManagerForm);
    }, [forms]);


    const resetUpdates = () => {
        const items = props.item.buildItems(props.itemList);
        setOldItems(items);
        setNewItems(items);
        itemsManagerForm.resetForm();
        props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [null, ""]);
    }


    const saveUpdates = () => {
        console.log("saveUpdates");
        const state = itemsManagerForm.getState();
        props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [state, ""]);
        if (!state)
            throw new Error("Error in Form");
        console.log("props.saveUpdates called");
        props.saveUpdates(oldItems, newItems);
    }

    
    const deleteItem = (itemID: string) => {
        const updatedItems = {...newItems} as any;
        delete updatedItems[itemID];
        setNewItems(updatedItems);
    }
    

    const insertItem = (item: Item) => {
        const updatedItems = {...newItems} as any;
        const itemID = (item as any)[props.item.itemID];
        updatedItems[itemID] = {...item};
        setNewItems(updatedItems);
    }


    const handleCreateItem = () => {
        const itemID = counter.toString();
        const item: Item = createBlankItem(itemID);
        setCounter(c => c - 1);
        insertForm(itemID, item);
        props.openForm(props.keyForUpdateManagerForm, itemID, "Create");
    }


    const handleUpdateItem = (itemID: string) => {
        console.log("handleUpdateItem");
        const item: Item = (newItems as any)[itemID];
        insertForm(itemID, item);
        console.log("\titemID: ", itemID);
        console.log("\titem: ", item);
        props.openForm(props.keyForUpdateManagerForm, itemID, "Update");
    }


    const createBlankItem = (itemID: string) => {
        const item: Item = {
            ...props.item.buildItem(null), 
            [props.item.itemID]: itemID
        }
        return item;
    }


    const insertForm = (itemID: string, item: Item) => {
        const updatedForms = {...forms} as any;
        updatedForms[itemID] = item;
        setForms(updatedForms);
    }


    const deleteForm = (itemID: string) => {
        const updatedForms = {...forms} as any;
        delete updatedForms[itemID];
        setForms(updatedForms);
    }


    const updateForm = (itemID: string, item: Item) => {
        const updatedForms = {...forms};
        updatedForms[itemID] = item;
        setForms(updatedForms);
    }


    const saveForm = (itemID: string) => {
        const item: Item = (forms as any)[itemID];
        insertItem(item);
        closeForm(itemID);
    }


    const closeForm = (itemID: string) => {
        props.closeForm(props.keyForUpdateManagerForm, itemID);
        deleteForm(itemID);
    }

    
    const resetForm = (itemID: string) => {
        const created = parseInt(itemID) < 0;
        if (created) {
            const item: Item = createBlankItem(itemID);
            insertForm(itemID, item);
        }
        else {
            const item: Item = (newItems as any)[itemID];
            insertForm(itemID, item);
        }
    }


    const deleteItemInForm = (itemID: string) => {
        deleteItem(itemID);
        itemsManagerForm.deleteInput(itemID);
        props.updateManagerForm.setInputState(props.keyForUpdateManagerForm, [itemsManagerForm.getState(), ""]);
        closeForm(itemID);
    }


    return {
        item: props.item,
        itemsManagerForm,
        updateManagerForm: props.updateManagerForm,
        oldItems,
        newItems,
        setNewItems,
        forms,
        counter,
        setCounter,
        resetUpdates,
        saveUpdates,
        deleteItem,
        insertItem,
        handleCreateItem,
        handleUpdateItem,
        createBlankItem,
        insertForm,
        deleteForm,
        updateForm,
        saveForm,
        closeForm,
        resetForm,
        deleteItemInForm
    }
}