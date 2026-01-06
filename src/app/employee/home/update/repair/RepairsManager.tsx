import { Repair as DB_Repair } from "waltronics-types";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Repair, Repairs } from "./_DEF";
import { Fragment } from "react";
import EntryCells from "@/shared/ReadWriteAppointment/Entry/EntryCells";
import CellAddItem from "@/shared/ReadWriteAppointment/Cell/CellAddItem";
import Cell from "@/shared/ReadWriteAppointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import RepairItem from "@/shared/items/RepairItem";
import PaddingCells from "@/shared/ReadWriteAppointment/Cell/PaddingCells";

interface RepairsManagerProps {
    repairsManager: ReturnType<typeof useItemsManager<DB_Repair, Repair, Repairs>>;
}

export default function RepairsManager(props: RepairsManagerProps) { 
    return (
        <div 
            id="MainContent"
            className="w-full grow grid grid-rows-[auto_48px] overflow-y-clip"
        >
            <div className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50 overflow-y-auto">
                <EntryCells
                    label="Parts"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.repairsManager.startCreateEditor}
                            />
                            {Object.entries(props.repairsManager.newItems).map(([itemID, item], i) => (
                                <Fragment key={i}>
                                    <Cell>
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
                                    </Cell>
                                </Fragment>
                            ))}
                            <PaddingCells
                                offset={1}
                                numberCells={Object.keys(props.repairsManager.newItems).length}
                            />
                        </Fragment>
                    }
                />
            </div>
            <SaveResetButtons
                changesMade={JSON.stringify(props.repairsManager.oldItems) !== JSON.stringify(props.repairsManager.newItems)}
                onSave={props.repairsManager.saveUpdates}
                onReset={props.repairsManager.resetUpdates}
            />
        </div>
    )
}
