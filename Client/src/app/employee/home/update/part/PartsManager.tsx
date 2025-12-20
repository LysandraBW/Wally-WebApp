import PartDisplay from "./PartDisplay";
import { Part as DB_AppointmentPart } from "waltronics-types";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import CreateItemButton from "@/features/ItemManager/components/CreateItemButton";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Part, Parts } from "./_DEF";
import ArchiveBox from "@/component/Icon/Icons/ArchiveBox";

interface PartsManagerProps {
    partsManager: ReturnType<typeof useItemsManager<DB_AppointmentPart, Part, Parts>>;
}

export default function PartsManager(props: PartsManagerProps) {
    return (
        <div className="shadow-sm border border-gray-300 rounded-b-md relative flex flex-col grow h-min">
            <div className="gap-4 bg-white relative h-full">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-0 p-0 text--center bg-white font-medium px-4 text-02 text-gray-700 tracking-wide whitespace-nowrap border-b border-gray-300 align-top pt-2">
                                Parts
                            </td>
                            <td className="p-0 border-b border-l border-gray-300">
                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                    <CreateItemButton
                                        onCreate={props.partsManager.startCreateEditor}
                                    />
                                </div>
                                <div className="px-4 py-4">
                                    <PartDisplay
                                        items={props.partsManager.newItems}
                                        onUpdate={props.partsManager.startUpdateEditor}
                                        onDelete={(ID: string) => props.partsManager.deleteItemByDisplay(ID)}
                                    />
                                    {Object.keys(props.partsManager.newItems as {}).length <= 0 &&
                                        <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                            <ArchiveBox/>
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
