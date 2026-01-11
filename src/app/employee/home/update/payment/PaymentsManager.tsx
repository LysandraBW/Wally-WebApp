import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import usePaymentsManager from "./usePaymentsManager";
import EntryTextField from "../../../../../shared/appointment/Entry/EntryTextField";
import { Fragment } from "react";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import CellAddItem from "@/shared/appointment/Cell/CellAddItem";
import Cell from "@/shared/appointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import PaymentItem from "@/shared/items/PaymentItem";
import { padArray } from "@/shared/appointment/Cell/PaddingCells";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";

interface PaymentsManagerProps {
    paymentsManager: ReturnType<typeof usePaymentsManager>;
 }

export default function PaymentsManager(props: PaymentsManagerProps) {
    return (
        <EntryWrapper
            entries={
                <Fragment>
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
                                {[...Object.entries(props.paymentsManager.newItems), ...padArray(Object.entries(props.paymentsManager.newItems).length + 1, [null, null])].map(([itemID, item], i) => (
                                    <Fragment key={itemID || i}>
                                        <Cell>
                                            {(itemID && item) &&
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
                                            }
                                        </Cell>
                                    </Fragment>
                                ))}
                            </Fragment>
                        }
                    />
                </Fragment>
            }
            saveResetButtons={
                <SaveResetButtons
                    changesMade={props.paymentsManager.oldCost !== props.paymentsManager.costForm.getInput("Cost").data || JSON.stringify(props.paymentsManager.oldItems) !== JSON.stringify(props.paymentsManager.newItems)}
                    onSave={props.paymentsManager.saveUpdates}
                    onReset={props.paymentsManager.resetUpdates}
                />
            }
        />
    )
}