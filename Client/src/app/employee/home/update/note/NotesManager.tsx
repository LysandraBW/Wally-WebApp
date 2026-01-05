import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Note as DB_Note } from "waltronics-types";
import { Note, Notes } from "./_DEF";
import EntryCells from "@/pages/ReadWriteAppointment/Entry/EntryCells";
import { Fragment } from "react";
import CellAddItem from "@/pages/ReadWriteAppointment/Cell/CellAddItem";
import Cell from "@/pages/ReadWriteAppointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import NoteItem from "@/pages/items/NoteItem";
import PaddingCells from "@/pages/ReadWriteAppointment/Cell/PaddingCells";

interface NotesManagerProps {
    notesManager: ReturnType<typeof useItemsManager<DB_Note, Note, Notes>>;
}

export default function NotesManager(props: NotesManagerProps) {
    return (
        <div 
            id="MainContent"
            className="w-full grow grid grid-rows-[auto_48px] overflow-y-clip"
        >
            <div className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50 overflow-y-auto">
                <EntryCells
                    label="Notes"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.notesManager.startCreateEditor}
                            />
                            {Object.entries(props.notesManager.newItems).map(([itemID, item], i) => (
                                <Fragment key={i}>
                                    <Cell>
                                        <UpdateItem
                                            canEdit={true}
                                            canDelete={true}
                                            onUpdate={() => props.notesManager.startUpdateEditor(itemID)}
                                            onDelete={() => props.notesManager.deleteItemByDisplay(itemID)}
                                        >
                                            <NoteItem
                                                note={item}
                                            />
                                        </UpdateItem>
                                    </Cell>
                                </Fragment>
                            ))}
                            <PaddingCells
                                offset={1}
                                numberCells={Object.keys(props.notesManager.newItems).length}
                            />
                        </Fragment>
                    }
                />
            </div>
            <SaveResetButtons
                changesMade={JSON.stringify(props.notesManager.oldItems) !== JSON.stringify(props.notesManager.newItems)}
                onSave={props.notesManager.saveUpdates}
                onReset={props.notesManager.resetUpdates}
            />
        </div>   
    )
}