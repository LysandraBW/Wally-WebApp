import PaymentDisplay from "./PaymentDisplay";
import PaymentForm from "./PaymentForm";
import { DefinePayment, Payment, MappedPayments, PaymentUpdates } from "./_DEF";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import useItemManager from "@/features/ItemManager/useItemManager";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import { Payment as DB_Payment} from "waltronics-types"
import { Fragment, useContext, useEffect, useState } from "react";
// import TextFieldGrid from "../../TextFieldGrid";
// import { Cost, costTest, CostUpdates, makeCost } from "../cost/_DEF";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
// import { COST } from "../../_DEF";
import makeForm from "@/features/Form/useForm/makeForm";
import { AnimatePresence, motion } from "motion/react";
// import { UpdateManagerContext } from "../../Update";
import useThingsManager from "../useThingsManager";
// import { Repair as DB_AppointmentPayment } from "waltronics-types";

interface PaymentsManagerProps {
    thingsManager: ReturnType<typeof useThingsManager<DB_Payment, Payment, MappedPayments>>
 }

// I decided to merge the CostManager and the PaymentManager.
// I'm not sure of an elegant way to go about this, so I've literally
// just combined the code from the two files until I figure out something else.
export default function PaymentsManager(props: PaymentsManagerProps) {
    // const costForm = useForm(COST);
    // const [oldCost, setOldCost] = useState<Cost>();

    // const processCostUpdates = (oldCost: Cost, newCost: Cost) => {
    //     const updates = {
    //         Cost: updatedValue(oldCost.Cost, newCost.Cost)
    //     } as CostUpdates;
    //     props.onSaveCostUpdates(updates);
    // }

    // const resetCostForm = async () => {
    //     const cost = makeCost(props.cost);
    //     setOldCost(cost);
    //     costForm.resetForm(makeForm(cost, costTest, true));
    //     props.parentForm.setInputState(COST, [costForm.getState(), ""]);
    // }

    // const saveCostForm = async () => {
    //     const state = costForm.getState();
    //     props.parentForm.setInputState(COST, [state, ""]);
    //     if (!state || !oldCost)
    //         return;
    //     const newCost = costForm.getData() as Cost;
    //     processCostUpdates(oldCost, newCost);
    // }

    // const updateCostValue = async (name: string, value: any) => {
    //     costForm.updateInputData(name, value);
    //     props.parentForm.setInputState(name, [costForm.getState(), ""]);
    //     // updateManagerContext.setChangesMade("Finances", true);
    // }

    // Save Cost and Payment Changes
    // const updateManagerContext = useContext(UpdateManagerContext);

    // const saveUpdates = () => {
    //     saveCostForm();
    //     itemManager.saveUpdates();
    //     // updateManagerContext.setChangesMade("Finances", false);
    // }

    // const resetUpdates = () => {
    //     resetCostForm();
    //     itemManager.resetUpdates();
    //     // updateManagerContext.setChangesMade("Finances", false);
    // }

    // Display
    // const [expanded, setExpanded] = useState(false);

    return (
        <div className="row-start-5 row-span-1 col-start-1 col-span-1 relative flex flex-col grow h-min">
            <div className="gap-4 bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-0 p-0 text--center bg-white font-medium px-4 text-03 tracking-wide whitespace-nowrap border border-gray-300 align-top pt-2">Repair</td>
                            <td className="p-0 border border-gray-300">
                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                    <CreateItemButton
                                        onCreate={props.thingsManager.openCreateThingForm}
                                    />
                                </div>
                                <div className="px-4 py-4">
                                    <PaymentDisplay
                                        items={props.thingsManager.newThings}
                                        onUpdate={props.thingsManager.openUpdateThingForm}
                                        onDelete={(ID: string) => {
                                            props.thingsManager.deleteThing(ID);
                                            // updateManagerContext.setChangesMade(props.tab, true);
                                        }}
                                    />
                                    {Object.keys(props.thingsManager.newThings as {}).length <= 0 &&
                                        <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                            <span className="text-gray-400 tracking-wide font-medium text-04">
                                                No Repairs Found
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
                    props.thingsManager.saveUpdates();
                    // updateManagerContext.setChangesMade(props.tab, false);
                }}
                onReset={() => {
                    props.thingsManager.resetUpdates();
                    // updateManagerContext.setChangesMade(props.tab, false);
                }}
            />
        </div>
    )
}