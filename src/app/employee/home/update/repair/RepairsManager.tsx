import { Repair as DB_Repair } from "waltronics-types";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Repair, Repairs } from "./_DEF";
import { Fragment } from "react";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import CellAddItem from "@/shared/appointment/Cell/CellAddItem";
import Cell from "@/shared/appointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import RepairItem from "@/shared/items/RepairItem";
import { padArray } from "@/shared/appointment/Cell/PaddingCells";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";

interface RepairsManagerProps {
    repairsManager: ReturnType<typeof useItemsManager<DB_Repair, Repair, Repairs>>;
}

export default function RepairsManager(props: RepairsManagerProps) { 
    return (
        <EntryWrapper
            entries={
                <EntryCells
                    label="Repairs"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.repairsManager.startCreateEditor}
                            />
                            {[...Object.entries(props.repairsManager.newItems), ...padArray(Object.entries(props.repairsManager.newItems).length + 1, [null, null])].map(([itemID, item], i) => (
                                <Fragment key={itemID || i}>
                                    <Cell>
                                        {(itemID && item) &&
                                            <UpdateItem
                                                canEdit={true}
                                                canDelete={true}
                                                onUpdate={() => props.repairsManager.startUpdateEditor(itemID)}
                                                onDelete={() => props.repairsManager.deleteItemByDisplay(itemID)}
                                            >
                                                <RepairItem
                                                    repair={item}
                                                />
                                            </UpdateItem>
                                        }
                                    </Cell>
                                </Fragment>
                            ))}
                        </Fragment>
                    }
                />
            }
            saveResetButtons={
                <SaveResetButtons
                    changesMade={JSON.stringify(props.repairsManager.oldItems) !== JSON.stringify(props.repairsManager.newItems)}
                    onSave={props.repairsManager.saveUpdates}
                    onReset={props.repairsManager.resetUpdates}
                />
            }
        />
    )
}
