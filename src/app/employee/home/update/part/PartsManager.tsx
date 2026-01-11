import { Part as DB_AppointmentPart } from "waltronics-types";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Part, Parts } from "./_DEF";
import { Fragment, useEffect } from "react";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import CellAddItem from "@/shared/appointment/Cell/CellAddItem";
import Cell from "@/shared/appointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import PartItem from "@/shared/items/PartItem";
import { padArray } from "@/shared/appointment/Cell/PaddingCells";
import resizeMainContent from "@/shared/appointment/resizeMainContent";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";

interface PartsManagerProps {
    partsManager: ReturnType<typeof useItemsManager<DB_AppointmentPart, Part, Parts>>;
}

export default function PartsManager(props: PartsManagerProps) {
    useEffect(() => {
        resizeMainContent();
        window.addEventListener("resize", resizeMainContent);
    }, []);

    return (
        <EntryWrapper
            entries={
                <EntryCells
                    label="Parts"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.partsManager.startCreateEditor}
                            />
                            {[...Object.entries(props.partsManager.newItems), ...padArray(Object.entries(props.partsManager.newItems).length + 1, [null, null])].map(([itemID, item], i) => (
                                <Fragment key={itemID || i}>
                                    <Cell>
                                        {(itemID && item) &&
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
                    changesMade={JSON.stringify(props.partsManager.oldItems) !== JSON.stringify(props.partsManager.newItems)}
                    onSave={props.partsManager.saveUpdates}
                    onReset={props.partsManager.resetUpdates}
                />
            }
        />
    )
}
