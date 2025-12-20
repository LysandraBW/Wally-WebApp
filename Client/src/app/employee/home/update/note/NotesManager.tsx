import NoteDisplay from "./NoteDisplay";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import CreateItemButton from "@/features/ItemManager/components/CreateItemButton";
import { Note as DB_Note } from "waltronics-types";
import { Note, Notes } from "./_DEF";

interface NotesManagerProps {
    notesManager: ReturnType<typeof useItemsManager<DB_Note, Note, Notes>>;
}

export default function NotesManager(props: NotesManagerProps) {
    return (
        <div className="shadow-sm border border-gray-300 rounded-b-md relative flex flex-col grow h-min">
            <div className="gap-4 bg-white relative h-full">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-0 p-0 text--center bg-white font-medium px-4 text-02 text-gray-700 tracking-wide whitespace-nowrap border-b border-gray-300 align-top pt-2">{props.notesManager.item.itemName}</td>
                            <td className="p-0 border-b border-l border-gray-300">
                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                    <CreateItemButton
                                        onCreate={props.notesManager.startCreateEditor}
                                    />
                                </div>
                                <div className="px-4 py-4">
                                    <NoteDisplay
                                        items={props.notesManager.newItems}
                                        onUpdate={props.notesManager.startUpdateEditor}
                                        onDelete={(ID: string) => props.notesManager.deleteItemByDisplay(ID)}
                                    />
                                    {Object.keys(props.notesManager.newItems as {}).length <= 0 &&
                                        <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                            <ArchiveBox/>
                                            <span className="text-gray-400 tracking-wide font-medium text-04">
                                                No {props.notesManager.item.itemName} Found
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
                onSave={() => props.notesManager.saveUpdates()}
                onReset={() => props.notesManager.resetUpdates()}
            />
        </div>   
    )
}