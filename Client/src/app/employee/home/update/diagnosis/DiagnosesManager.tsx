import DiagnosisDisplay from "./DiagnosisDisplay";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Diagnosis, Diagnoses } from "@/app/employee/home/update/diagnosis/_DEF";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import CreateItemButton from "@/features/ItemManager/components/CreateItemButton";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";


interface DiagnosesManagerProps {
    diagnosesManager: ReturnType<typeof useItemsManager<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>>;
}

export default function DiagnosesManager(props: DiagnosesManagerProps) {
    return (
        <div className="shadow-sm border border-gray-300 rounded-b-md relative flex flex-col grow h-min">
            <div className="gap-4 bg-white relative h-full">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-0 p-0 text--center bg-white font-medium px-4 text-02 text-gray-700 tracking-wide whitespace-nowrap border-b border-gray-300 align-top pt-2">
                                Diagnoses
                            </td>
                            <td className="p-0 border-b border-l border-gray-300">
                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                    <CreateItemButton
                                        onCreate={props.diagnosesManager.startCreateEditor}
                                    />
                                </div>
                                <div className="px-4 py-4">
                                    <DiagnosisDisplay
                                        items={props.diagnosesManager.newItems}
                                        onUpdate={props.diagnosesManager.startUpdateEditor}
                                        onDelete={(ID: string) => props.diagnosesManager.deleteItemByDisplay(ID)}
                                    />
                                    {Object.keys(props.diagnosesManager.newItems as {}).length <= 0 &&
                                        <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                            <span className="text-gray-400 tracking-wide font-medium text-04">
                                                No {props.diagnosesManager.item.itemName} Found
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
                onSave={() => props.diagnosesManager.saveUpdates()}
                onReset={() => props.diagnosesManager.resetUpdates()}
            />
        </div> 
    )
}
