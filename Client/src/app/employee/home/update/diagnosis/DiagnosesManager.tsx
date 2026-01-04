import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Diagnosis, Diagnoses } from "@/app/employee/home/update/diagnosis/_DEF";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Fragment } from "react";
import EntryCells from "@/pages/ReadWriteAppointment/Entry/EntryCells";
import CellAddItem from "@/pages/ReadWriteAppointment/Cell/CellAddItem";
import Cell from "@/pages/ReadWriteAppointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DiagnosisItem from "@/pages/items/DiagnosisItem";
import PaddingCells from "@/pages/ReadWriteAppointment/Cell/PaddingCells";


interface DiagnosesManagerProps {
    diagnosesManager: ReturnType<typeof useItemsManager<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>>;
}

export default function DiagnosesManager(props: DiagnosesManagerProps) {
    return (
        <div 
            id="MainContent"
            className="w-full grow grid grid-rows-[auto_48px] overflow-y-clip"
        >
            <div className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50 overflow-y-auto">
                <EntryCells
                    label="Diagnoses"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.diagnosesManager.startCreateEditor}
                            />
                            {Object.entries(props.diagnosesManager.newItems).map(([itemID, item], i) => (
                                <Fragment key={i}>
                                    <Cell>
                                        <UpdateItem
                                            canEdit={true}
                                            canDelete={true}
                                            onUpdate={() => props.diagnosesManager.startUpdateEditor(itemID)}
                                            onDelete={() => props.diagnosesManager.deleteItemByDisplay(itemID)}
                                        >
                                            <DiagnosisItem
                                                diagnosis={item}
                                            />
                                        </UpdateItem>
                                    </Cell>
                                </Fragment>
                            ))}
                            <PaddingCells
                                offset={1}
                                numberCells={Object.keys(props.diagnosesManager.newItems).length}
                            />
                        </Fragment>
                    }
                />
            </div>
            <SaveResetButtons
                onSave={props.diagnosesManager.saveUpdates}
                onReset={props.diagnosesManager.resetUpdates}
            />
        </div>
    )
}
