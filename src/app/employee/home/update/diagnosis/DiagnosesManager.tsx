import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Diagnosis, Diagnoses } from "@/app/employee/home/update/diagnosis/_DEF";
import useItemsManager from "../../../../../features/ItemManager/useItemsManager";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import { Fragment } from "react";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import CellAddItem from "@/shared/appointment/Cell/CellAddItem";
import Cell from "@/shared/appointment/Cell/Cell";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DiagnosisItem from "@/shared/items/DiagnosisItem";
import { padArray } from "@/shared/appointment/Cell/PaddingCells";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";


interface DiagnosesManagerProps {
    diagnosesManager: ReturnType<typeof useItemsManager<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>>;
}

export default function DiagnosesManager(props: DiagnosesManagerProps) {
    return (
        <EntryWrapper
            entries={
                <EntryCells
                    label="Diagnoses"
                    cells={
                        <Fragment>
                            <CellAddItem
                                onClick={props.diagnosesManager.startCreateEditor}
                            />
                            {[...Object.entries(props.diagnosesManager.newItems), ...padArray(Object.entries(props.diagnosesManager.newItems).length + 1, [null, null])].map(([itemID, item], i) => (
                                <Fragment key={itemID || i}>
                                    <Cell>
                                        {(itemID && item) &&
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
                    changesMade={JSON.stringify(props.diagnosesManager.oldItems) !== JSON.stringify(props.diagnosesManager.newItems)}
                    onSave={props.diagnosesManager.saveUpdates}
                    onReset={props.diagnosesManager.resetUpdates}
                />
            }
        />
    )
}
