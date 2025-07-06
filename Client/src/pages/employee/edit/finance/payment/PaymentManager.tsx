import PaymentDisplay from "./PaymentDisplay";
import PaymentForm from "./PaymentForm";
import { DefinePayment, Payments, PaymentUpdates } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import useItemManager from "@/features/ItemManager/useItemManager";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import { Payment as DB_Payment} from "waltronics-types"
import { Fragment, useContext, useEffect, useState } from "react";
import TextFieldGrid from "../../TextFieldGrid";
import { Cost, costTest, CostUpdates, makeCost } from "../cost/_DEF";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import { COST } from "../../_DEF";
import makeForm from "@/features/Form/useForm/makeForm";
import { AnimatePresence, motion } from "motion/react";
import { UpdateManagerContext } from "../../Update";

interface PaymentManagerProps {
    parentForm: UseForm;
    // Payment
    paymentList: Array<DB_Payment>;
    onSavePaymentUpdates: (updates: PaymentUpdates) => void;
    // Cost
    cost: string;
    onSaveCostUpdates: (updates: CostUpdates) => void;
    // Forms
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
 }

// I decided to merge the CostManager and the PaymentManager.
// I'm not sure of an elegant way to go about this, so I've literally
// just combined the code from the two files until I figure out something else.
export default function PaymentManager(props: PaymentManagerProps) {
    // Payment
    const definePayment = new DefinePayment();
    const processPaymentUpdates = (oldItems: Payments, newItems: Payments) => {
        const itemID = "PaymentID";
        const updateKeys = ["Payment"];
        const insertKeys = ["Payment", "Name", "Type", "CCN", "EXP"];
        const updates = buildUpdate(oldItems, newItems, itemID, updateKeys, insertKeys, itemID);
        props.onSavePaymentUpdates(updates);
    }

     const itemManager = useItemManager({
        itemList: props.paymentList,
        defineItem: definePayment,
        parentForm: props.parentForm,
        saveAllUpdates: processPaymentUpdates
    });

    // Cost
    useEffect(() => {
        resetCostForm();
    }, [props.cost]);

    const costForm = useForm(COST);
    const [oldCost, setOldCost] = useState<Cost>();
    const processCostUpdates = (oldCost: Cost, newCost: Cost) => {
        const updates = {
            Cost: updatedValue(oldCost.Cost, newCost.Cost)
        } as CostUpdates;
        props.onSaveCostUpdates(updates);
    }

    const resetCostForm = async () => {
        const cost = makeCost(props.cost);
        setOldCost(cost);
        costForm.resetForm(makeForm(cost, costTest, true));
        props.parentForm.setInputState(COST, [costForm.getState(), ""]);
    }

    const saveCostForm = async () => {
        const state = costForm.getState();
        props.parentForm.setInputState(COST, [state, ""]);
        if (!state || !oldCost)
            return;
        const newCost = costForm.getData() as Cost;
        processCostUpdates(oldCost, newCost);
    }

    const updateCostValue = async (name: string, value: any) => {
        costForm.updateInputData(name, value);
        props.parentForm.setInputState(name, [costForm.getState(), ""]);
        updateManagerContext.setChangesMade("Finances", true);
    }

    // Save Cost and Payment Changes
    const updateManagerContext = useContext(UpdateManagerContext);

    const saveUpdates = () => {
        saveCostForm();
        itemManager.saveUpdates();
        updateManagerContext.setChangesMade("Finances", false);
    }

    const resetUpdates = () => {
        resetCostForm();
        itemManager.resetUpdates();
        updateManagerContext.setChangesMade("Finances", false);
    }

    // Display
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (props.openForms.findIndex(f => f === "Add Payment") === -1) {
            console.log("Cancel Create");
            itemManager.cancelCreate();
        }

        if (props.openForms.findIndex(f => f === "Edit Payment") === -1) {
            console.log("Cancel Update");
            itemManager.cancelUpdate();
        }
    }, [props.openForms]);

    useEffect(() => {
        
        console.log("CREATE ID CHANGED", itemManager.createID);
    }, [itemManager.createID]);

    useEffect(() => {
        
        console.log("update ID CHANGED",itemManager.updateID);
    }, [itemManager.updateID]);

    useEffect(() => {
        if (itemManager.createID)
            props.openForm("Add Payment");
        else{
            setExpanded(false);
            props.closeForm("Add Payment");}
        if (itemManager.updateID)
            props.openForm("Edit Payment");
        else{
            setExpanded(false);
            props.closeForm("Edit Payment");}
    }, [itemManager.createID, itemManager.updateID]);

    return (
        <Fragment>
            {props.tabOpen &&
                <div className="row-start-5 row-span-1 col-start-1 col-span-1 relative flex flex-col grow h-min">
                    <div className="gap-4 bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full">
                        <table className="w-full">
                            <tbody>
                                 <TextFieldGrid
                                    type="text"
                                    name="Cost"
                                    label="Cost USD"
                                    value={costForm.getInput("Cost").data}
                                    state={costForm.getInput("Cost").state}
                                    onChange={updateCostValue}
                                    onBlur={undefined}
                                />
                                <tr>
                                    <td className="w-0 p-0 text--center bg-white font-medium px-4 text-03 tracking-wide whitespace-nowrap border border-gray-300 pt-2 align-top">Payments</td>
                                    <td className="p-0 border border-gray-300">
                                        <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                            <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                            <CreateItemButton
                                                onCreate={itemManager.onClickCreateItem}
                                            />
                                        </div>
                                        <div className="px-4 py-4">
                                            <PaymentDisplay
                                                items={itemManager.newItems}
                                                onUpdate={itemManager.onClickUpdateItem}
                                                onDelete={(ID: string) => {
                                                    itemManager.deleteItem(ID);
                                                    updateManagerContext.setChangesMade("Finances", true);
                                                }}
                                            />
                                            {Object.keys(itemManager.newItems).length <= 0 &&
                                                <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                    </svg>
                                                <span className="text-gray-400 tracking-wide font-medium text-04">
                                                        No Payment Found
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
                        onSave={saveUpdates}
                        onReset={resetUpdates}
                    />
                </div>
            }
            <AnimatePresence>
                {((props.tabOpen && itemManager.createID && props.openFormDisplayed === `Add ${itemManager.defineItem.itemName}`) || (itemManager.createID && props.openFormDisplayed === "Add Payment")) &&
                    <motion.div
                        initial={{width: "0px", opacity: 0}}
                        animate={{width: "400px", opacity: 1}}
                        exit={{width: "0px", opacity: 0}}
                        key={itemManager.defineItem.itemName + "UnexpandedAdd"}
                        className="overflow-x-hidden w-[400px] max-w-full row-start-2 row-span-4 col-start-3 col-span-1 flex grow bg-white relative !bg-white mb-0"
                    >
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
                            onExpand={() => {setExpanded(true)}}
                            onMinimize={() => {setExpanded(false)}}
                            expanded={expanded}
                        />
                    </motion.div>
                }
                {((props.tabOpen && itemManager.updateID && props.openFormDisplayed === `Edit ${itemManager.defineItem.itemName}`) || (itemManager.updateID && props.openFormDisplayed === "Edit Payment")) &&
                    <motion.div
                        initial={{width: "0px", opacity: 0}}
                        animate={{width: "400px", opacity: 1}}
                        exit={{width: "0px", opacity: 0}}
                        key={itemManager.defineItem.itemName + "UnexpandedEdit"}
                        className="overflow-x-hidden w-[400px] row-start-2 row-span-4 col-start-3 col-span-1 flex grow bg-white relative  !bg-white mb-0"
                    >
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
                            onExpand={() => {setExpanded(true)}}
                            onMinimize={() => {setExpanded(false)}}
                            expanded={expanded}
                        />
                    </motion.div>
                }
                {(((props.tabOpen && itemManager.updateID && props.openFormDisplayed === `Edit ${itemManager.defineItem.itemName}`) || (itemManager.updateID && props.openFormDisplayed === "Edit Payment")) && expanded) &&
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
                            onExpand={() => {setExpanded(true)}}
                            onMinimize={() => {setExpanded(false)}}
                            expanded={expanded}
                        />
                    </Cover>
                }
                {(((props.tabOpen && itemManager.createID && props.openFormDisplayed === `Add ${itemManager.defineItem.itemName}`) || (itemManager.createID && props.openFormDisplayed === "Add Payment")) && expanded) &&
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
                                onExpand={() => {setExpanded(true)}}
                                onMinimize={() => {setExpanded(false)}}
                                expanded={expanded}
                            />
                        </div>
                    </Cover>
                }
            </AnimatePresence>
        </Fragment>
    )
}