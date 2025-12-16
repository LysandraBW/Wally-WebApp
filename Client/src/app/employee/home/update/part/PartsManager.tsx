import PartDisplay from "./PartDisplay";
import { Part as DB_AppointmentPart } from "waltronics-types";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import CreateItemButton from "@/features/ItemManager/components/CreateItemButton";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Part, Parts } from "./_DEF";

interface PartsManagerProps {
    partsManager: ReturnType<typeof useItemsManager<DB_AppointmentPart, Part, Parts>>;
}

export default function PartsManager(props: PartsManagerProps) {
    return (
        <div className="row-start-5 row-span-1 col-start-1 col-span-1 relative flex flex-col grow h-min">
            <div className="gap-4 bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-0 p-0 text--center bg-white font-medium px-4 text-03 tracking-wide whitespace-nowrap border border-gray-300 align-top pt-2">{props.partsManager.item.itemName}</td>
                            <td className="p-0 border border-gray-300">
                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                    <CreateItemButton
                                        onCreate={props.partsManager.handleCreateItem}
                                    />
                                </div>
                                <div className="px-4 py-4">
                                    <PartDisplay
                                        items={props.partsManager.newItems}
                                        onUpdate={props.partsManager.handleUpdateItem}
                                        onDelete={(ID: string) => props.partsManager.deleteItem(ID)}
                                    />
                                    {Object.keys(props.partsManager.newItems as {}).length <= 0 &&
                                        <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                            <span className="text-gray-400 tracking-wide font-medium text-04">
                                                No {props.partsManager.item.itemName} Found
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
                onSave={() => props.partsManager.saveUpdates()}
                onReset={() => props.partsManager.resetUpdates()}
            />
        </div> 
    )
}
