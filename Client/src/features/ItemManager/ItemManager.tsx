import CreateItemButton from "./Form/CreateItemButton";
import useItemManager, { UseItemManagerProps } from "./useItemManager";
import { UseItemFormProps } from "./useItemForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "./Form/SaveResetButtons";
import { Fragment, JSX, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UpdateManagerContext } from "@/pages/employee/edit/Update";

export interface DisplayProps<Items> {
    items: Items;
    onDelete: (ID: string) => void;
    onUpdate: (ID: string) => void;
}

export interface FormProps<BaseItem, Item, Items> extends UseItemFormProps<BaseItem, Item, Items> {
    onCancel: () => void;
    onDelete: () => void;
    onExpand: () => void;
    onMinimize: () => void;
    expanded: boolean;
}

export interface ItemManagerProps<BaseItem, Item, Items> extends UseItemManagerProps<BaseItem, Item, Items> {
    Form: (props: FormProps<BaseItem, Item, Items>) => JSX.Element;
    Display: (props: DisplayProps<Items>) => JSX.Element;
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
    tab: string;
}

export default function ItemManager<BaseItem, Item, Items>(props: ItemManagerProps<BaseItem, Item, Items>) {
    const itemManager = useItemManager(props);
    const updateManagerContext = useContext(UpdateManagerContext);

    // Display
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (props.openForms.findIndex(f => f === `Add ${itemManager.defineItem.itemName}`) === -1)
            itemManager.cancelCreate();

        if (props.openForms.findIndex(f => f === `Edit ${itemManager.defineItem.itemName}`) === -1)
            itemManager.cancelUpdate();
    }, [props.openForms]);

    useEffect(() => {
        if (itemManager.createID) {
            props.openForm(`Add ${itemManager.defineItem.itemName}`);
            console.log("BEING CALLED")}
        else{
            setExpanded(false);
            props.closeForm(`Add ${itemManager.defineItem.itemName}`);}

        if (itemManager.updateID)
            props.openForm(`Edit ${itemManager.defineItem.itemName}`);
        else{
            setExpanded(false);
            props.closeForm(`Edit ${itemManager.defineItem.itemName}`);}
    }, [itemManager.createID, itemManager.updateID]);

    useEffect(() => {
        console.log(expanded);
    }, [expanded]);

    return (
        <Fragment>
            {props.tabOpen &&
                <div className="row-start-5 row-span-1 col-start-1 col-span-1 relative flex flex-col grow h-min">
                    <div className="gap-4 bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="w-0 p-0 text--center bg-white font-medium px-4 text-03 tracking-wide whitespace-nowrap border border-gray-300 align-top pt-2">{itemManager.defineItem.itemName}</td>
                                    <td className="p-0 border border-gray-300">
                                        <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                            <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                            <CreateItemButton
                                                onCreate={itemManager.onClickCreateItem}
                                            />
                                        </div>
                                        <div className="px-4 py-4">
                                            <props.Display
                                                items={itemManager.newItems}
                                                onUpdate={itemManager.onClickUpdateItem}
                                                onDelete={(ID: string) => {
                                                    itemManager.deleteItem(ID);
                                                    updateManagerContext.setChangesMade(props.tab, true);
                                                }}
                                            />
                                            {Object.keys(itemManager.newItems as {}).length <= 0 &&
                                                <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                    </svg>
                                                    <span className="text-gray-400 tracking-wide font-medium text-04">
                                                        No {itemManager.defineItem.itemName} Found
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <SaveResetButtons
                        onSave={() => {
                            itemManager.saveUpdates();
                            updateManagerContext.setChangesMade(props.tab, false);
                        }}
                        onReset={() => {
                            itemManager.resetUpdates();
                            updateManagerContext.setChangesMade(props.tab, false);
                        }}
                    />
                </div>   
            }
            <AnimatePresence>
                {((props.tabOpen && itemManager.createID && props.openFormDisplayed === `Add ${itemManager.defineItem.itemName}`) || (itemManager.createID && props.openFormDisplayed === `Add ${itemManager.defineItem.itemName}`)) &&
                    <motion.div
                        initial={{width: "0px", opacity: 0}}
                        animate={{width: "400px", opacity: 1}}
                        exit={{width: "0px", opacity: 0}}
                        key={itemManager.defineItem.itemName + "UnexpandedAdd"}
                        className="overflow-x-hidden w-[400px] row-start-2 row-span-4 col-start-3 col-span-1 flex grow bg-white relative after:absolute after:w-[1px] after:h-full after:bg-gray-300 after:right-0 after:top-0 !bg-white mb-0"
                    >
                        <props.Form
                            mode="Create"
                            defineItem={props.defineItem}
                            mutateItem={itemManager.toCreateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelCreate}
                            onMutate={itemManager.createItem}
                            onDelete={() =>  itemManager.deleteItem(itemManager.createID)}
                            onExpand={() => setExpanded(true)}
                            onMinimize={() => setExpanded(false)}
                            expanded={expanded}
                        />
                    </motion.div>
                }
                {((props.tabOpen && itemManager.updateID && props.openFormDisplayed === `Edit ${itemManager.defineItem.itemName}`) || (itemManager.updateID && props.openFormDisplayed === `Edit ${itemManager.defineItem.itemName}`)) &&
                    <motion.div 
                        initial={{width: "0px"}}
                        animate={{width: "400px"}}
                        exit={{width: "0px"}}
                        key={itemManager.defineItem.itemName + "UnexpandedEdit"}
                        className="overflow-x-hidden w-[400px] row-start-2 row-span-4 col-start-3 col-span-1 flex grow bg-white relative after:absolute after:w-[1px] after:h-full after:bg-gray-300 after:right-0 after:top-0 !bg-white mb-0"
                    >
                        <props.Form
                            mode="Update"
                            defineItem={props.defineItem}
                            mutateItem={itemManager.toUpdateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelUpdate}
                            onMutate={itemManager.updateItem}
                            onDelete={() => itemManager.deleteItem(itemManager.updateID)}
                            onExpand={() => setExpanded(true)}
                            onMinimize={() => setExpanded(false)}
                            expanded={expanded}
                        />
                    </motion.div>
                }
                {(((props.tabOpen && itemManager.updateID && props.openFormDisplayed === `Edit ${itemManager.defineItem.itemName}`) || (itemManager.updateID && props.openFormDisplayed === `Edit ${itemManager.defineItem.itemName}`)) && expanded) &&
                    <Cover style="overflow-auto p-10 scroll-hide">
                        <props.Form
                            mode="Update"
                            defineItem={props.defineItem}
                            mutateItem={itemManager.toUpdateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelUpdate}
                            onMutate={itemManager.updateItem}
                            onDelete={() => itemManager.deleteItem(itemManager.updateID)}
                            onExpand={() => setExpanded(true)}
                            onMinimize={() => setExpanded(false)}
                            expanded={expanded}
                        />
                    </Cover>
                }
                {(((props.tabOpen && itemManager.createID && props.openFormDisplayed === `Add ${itemManager.defineItem.itemName}`) || (itemManager.createID && props.openFormDisplayed === `Add ${itemManager.defineItem.itemName}`)) && expanded) &&
                    <Cover style="overflow-auto p-10 scroll-hide grow">
                        <div className="flex flex-col max-w-[440px] grow">
                            <props.Form
                                mode="Create"
                                defineItem={props.defineItem}
                                mutateItem={itemManager.toCreateItem}
                                parentForm={itemManager.form}
                                onCancel={itemManager.cancelCreate}
                                onMutate={itemManager.createItem}
                                onDelete={() =>  itemManager.deleteItem(itemManager.createID)}
                                onExpand={() => setExpanded(true)}
                                onMinimize={() => setExpanded(false)}
                                expanded={expanded}
                            />
                        </div>
                    </Cover>
                }
            </AnimatePresence>
        </Fragment>
    )
}