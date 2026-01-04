import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import usePaymentsManager from "./usePaymentsManager";
import EntryTextField from "../../../../../pages/ReadWriteAppointment/Entry/EntryTextField";
import { Fragment } from "react";
import EntryCells from "@/pages/ReadWriteAppointment/Entry/EntryCells";
import CellAddItem from "@/pages/ReadWriteAppointment/Cell/CellAddItem";
import Cell from "@/pages/ReadWriteAppointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import PaymentItem from "@/pages/items/PaymentItem";
import PaddingCells from "@/pages/ReadWriteAppointment/Cell/PaddingCells";

interface PaymentsManagerProps {
    paymentsManager: ReturnType<typeof usePaymentsManager>;
 }

export default function PaymentsManager(props: PaymentsManagerProps) {
    return (
        <div 
            id="MainContent"
            className="w-full grow grid grid-rows-[auto_48px] overflow-y-clip"
        >
            <div className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50 overflow-y-auto">
                <EntryTextField
                    type="text"
                    name="Cost"
                    label="Cost"
                    prefix="$"
                    value={props.paymentsManager.costForm.getInput("Cost").data}
                    state={props.paymentsManager.costForm.getInput("Cost").state}
                    onChange={props.paymentsManager.updateCostValue}
                    onBlur={undefined}
                />
                <EntryCells
                    label="Payments"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.paymentsManager.startCreateEditor}
                            />
                            {Object.entries(props.paymentsManager.newItems).map(([itemID, item], i) => (
                                <Fragment key={i}>
                                    <Cell>
                                        <UpdateItem
                                            canEdit={true}
                                            canDelete={true}
                                            onUpdate={() => props.paymentsManager.startUpdateEditor(itemID)}
                                            onDelete={() => props.paymentsManager.deleteItemByDisplay(itemID)}
                                        >
                                            <PaymentItem
                                                payment={item}
                                            />
                                        </UpdateItem>
                                    </Cell>
                                </Fragment>
                            ))}
                            <PaddingCells
                                offset={1}
                                numberCells={Object.keys(props.paymentsManager.newItems).length}
                            />
                        </Fragment>
                    }
                />
            </div>
            <SaveResetButtons
                onSave={props.paymentsManager.saveUpdates}
                onReset={props.paymentsManager.resetUpdates}
            />
        </div>
    )
}