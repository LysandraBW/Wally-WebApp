import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Note as DB_Note } from "waltronics-types";
import { Note, Notes } from "./_DEF";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import { Fragment } from "react";
import CellAddItem from "@/shared/appointment/Cell/CellAddItem";
import Cell from "@/shared/appointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import NoteItem from "@/shared/items/NoteItem";
import { padArray } from "@/shared/appointment/Cell/PaddingCells";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";

interface NotesManagerProps {
    notesManager: ReturnType<typeof useItemsManager<DB_Note, Note, Notes>>;
}

export default function NotesManager(props: NotesManagerProps) {
    return (
        <EntryWrapper
            entries={
                <EntryCells
                    label="Notes"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.notesManager.startCreateEditor}
                            />
                            {[...Object.entries(props.notesManager.newItems), ...padArray(Object.entries(props.notesManager.newItems).length + 1, [null, null])].map(([itemID, item], i) => (
                                <Fragment key={itemID || i}>
                                    <Cell>
                                        {(itemID && item) &&
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
                    changesMade={JSON.stringify(props.notesManager.oldItems) !== JSON.stringify(props.notesManager.newItems)}
                    onSave={props.notesManager.saveUpdates}
                    onReset={props.notesManager.resetUpdates}
                />
            }
        />
    )
}