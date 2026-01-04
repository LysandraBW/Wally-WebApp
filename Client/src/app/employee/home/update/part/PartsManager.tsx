import { Part as DB_AppointmentPart } from "waltronics-types";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Part, Parts } from "./_DEF";
import { Fragment } from "react";
import EntryCells from "@/pages/ReadWriteAppointment/Entry/EntryCells";
import CellAddItem from "@/pages/ReadWriteAppointment/Cell/CellAddItem";
import Cell from "@/pages/ReadWriteAppointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import PartItem from "@/pages/items/PartItem";
import PaddingCells from "@/pages/ReadWriteAppointment/Cell/PaddingCells";

interface PartsManagerProps {
    partsManager: ReturnType<typeof useItemsManager<DB_AppointmentPart, Part, Parts>>;
}

export default function PartsManager(props: PartsManagerProps) {
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
                                onClick={props.partsManager.startCreateEditor}
                            />
                            {Object.entries(props.partsManager.newItems).map(([itemID, item], i) => (
                                <Fragment key={i}>
                                    <Cell>
                                        <UpdateItem
                                            canEdit={true}
                                            canDelete={true}
                                            onUpdate={() => props.partsManager.startUpdateEditor(itemID)}
                                            onDelete={() => props.partsManager.deleteItemByDisplay(itemID)}
                                        >
                                            <PartItem
                                                part={item}
                                            />
                                        </UpdateItem>
                                    </Cell>
                                </Fragment>
                            ))}
                            <PaddingCells
                                offset={1}
                                numberCells={Object.keys(props.partsManager.newItems).length}
                            />
                        </Fragment>
                    }
                />
            </div>
            <SaveResetButtons
                onSave={props.partsManager.saveUpdates}
                onReset={props.partsManager.resetUpdates}
            />
        </div>
    )
}
