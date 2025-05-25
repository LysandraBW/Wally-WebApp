import PaymentDisplay from "./PaymentDisplay";
import PaymentForm from "./PaymentForm";
import { DefinePayment, Payments, PaymentUpdates } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import useItemManager from "@/features/ItemManager/useItemManager";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import { Payment as DB_Payment} from "waltronics-types"
import { Fragment, useEffect, useState } from "react";

interface PaymentManagerProps {
    parentForm: UseForm;
    paymentList: Array<DB_Payment>;
    onSaveUpdates: (updates: PaymentUpdates) => void;
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
 }

export default function PaymentManager(props: PaymentManagerProps) {
    const definePayment = new DefinePayment();

    const processUpdates = (oldItems: Payments, newItems: Payments) => {
        const itemID = "PaymentID";
        const updateKeys = ["Payment"];
        const insertKeys = ["Payment", "Name", "Type", "CCN", "EXP"];
        const updates = buildUpdate(oldItems, newItems, itemID, updateKeys, insertKeys, itemID);
        props.onSaveUpdates(updates);
    }

    const itemManager = useItemManager({
        itemList: props.paymentList,
        defineItem: definePayment,
        parentForm: props.parentForm,
        saveAllUpdates: processUpdates
    });

    useEffect(() => {
        if (props.openForms.findIndex(f => f === "Create Payment") === -1) {
            itemManager.cancelCreate();
        }

        if (props.openForms.findIndex(f => f === "Update Payment") === -1) {
            itemManager.cancelUpdate();
        }
    }, [props.openForms]);

    useEffect(() => {
        if (itemManager.createID)
            props.openForm("Create Payment");
        else
            props.closeForm("Create Payment");
        if (itemManager.updateID)
            props.openForm("Update Payment");
        else
            props.closeForm("Update Payment");
    }, [itemManager.createID, itemManager.updateID]);

    const [expand, setExpand] = useState(false);

    return (
        <Fragment>
            {props.tabOpen &&
                <div className="row-start-5 row-span-1 col-start-1 col-span-1 relative flex flex-col grow h-min">
                    <div className="gap-4 bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full">
                        <div className="p-4 border-y border-y-gray-300">
                            <CreateItemButton
                                onCreate={itemManager.onClickCreateItem}
                            />
                        </div>
                        <div className="px-4 py-4">
                            <PaymentDisplay
                                items={itemManager.newItems}
                                onUpdate={itemManager.onClickUpdateItem}
                                onDelete={itemManager.deleteItem}
                            />
                            {Object.keys(itemManager.newItems).length <= 0 &&
                                <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <span className="text-gray-400 tracking-wide font-medium text-04">
                                        No Payments Found
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                    <SaveResetButtons
                        onSave={itemManager.saveUpdates}
                        onReset={itemManager.resetUpdates}
                    />
                </div>
            }
            {((props.tabOpen && itemManager.createID) || (itemManager.createID && props.openFormDisplayed === "Create Payment")) &&
                <div className="border-l border-l-gray-300 row-start-2 row-span-4 col-start-3 col-span-1 border-t- border-t-gray-300 flex grow bg-white relative after:absolute after:w-[1px] after:h-full after:bg-gray-300 after:right-0 after:top-0 !bg-white mb-8 border-b border-b-gray-300">
                    <PaymentForm
                        mode="Create"
                        defineItem={definePayment}
                        mutateItem={itemManager.toCreateItem}
                        parentForm={itemManager.form}
                        onCancel={itemManager.cancelCreate}
                        onMutate={itemManager.createItem}
                        onDelete={() => {
                            itemManager.deleteItem(itemManager.createID);
                        }}
                        onExpand={() => {setExpand(true)}}
                        onMinimize={() => {setExpand(false)}}
                        expanded={expand}
                    />
                </div>
            }
            {((props.tabOpen && itemManager.updateID) || (itemManager.updateID && props.openFormDisplayed === "Update Payment")) &&
                <div className="col-start-2 col-span-1">
                    <PaymentForm
                        mode="Update"
                        defineItem={definePayment}
                        mutateItem={itemManager.toUpdateItem}
                        parentForm={itemManager.form}
                        onCancel={itemManager.cancelUpdate}
                        onMutate={itemManager.updateItem}
                        onDelete={() => {
                            itemManager.deleteItem(itemManager.updateID);
                        }}
                        onExpand={() => {setExpand(true)}}
                        onMinimize={() => {setExpand(false)}}
                        expanded={expand}
                    />
                </div>
            }
            {(((props.tabOpen && itemManager.updateID) || (itemManager.updateID && props.openFormDisplayed === "Update Payment")) && expand) &&
                <Cover style="overflow-auto p-10 scroll-hide">
                    <PaymentForm
                        mode="Update"
                        defineItem={definePayment}
                        mutateItem={itemManager.toUpdateItem}
                        parentForm={itemManager.form}
                        onCancel={itemManager.cancelUpdate}
                        onMutate={itemManager.updateItem}
                        onDelete={() => {
                            itemManager.deleteItem(itemManager.updateID);
                        }}
                        onExpand={() => {setExpand(true)}}
                        onMinimize={() => {setExpand(false)}}
                        expanded={expand}
                    />
                </Cover>
            }
            {(((props.tabOpen && itemManager.createID) || (itemManager.createID && props.openFormDisplayed === "Create Payment")) && expand) &&
                <Cover style="overflow-auto p-10 scroll-hide grow">
                    <div className="flex flex-col max-w-[440px] grow">
                        <PaymentForm
                            mode="Create"
                            defineItem={definePayment}
                            mutateItem={itemManager.toCreateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelCreate}
                            onMutate={itemManager.createItem}
                            onDelete={() => {
                                itemManager.deleteItem(itemManager.createID);
                            }}
                            onExpand={() => {setExpand(true)}}
                            onMinimize={() => {setExpand(false)}}
                            expanded={expand}
                        />
                    </div>
                </Cover>
            }
        </Fragment>
    )
}