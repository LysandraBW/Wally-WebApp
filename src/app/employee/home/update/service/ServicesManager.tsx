import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import useServicesManager from "./useServicesManager";
import { Fragment, useEffect } from "react";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import ServiceItem from "@/shared/items/ServiceItem";
import EntryCells from "@/shared/appointment/Entry/EntryCells";
import { AddItem } from "@/shared/appointment/Cell/CellAddItem";
import Cell from "@/shared/appointment/Cell/Cell";
import { padArray } from "@/shared/appointment/Cell/PaddingCells";
import AddHelper from "./AddHelper";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";

interface ServicesManagerProps {
    servicesManager: ReturnType<typeof useServicesManager>;
}

export default function ServicesManager(props: ServicesManagerProps) {
    return (
        <EntryWrapper
            entries={
                <EntryCells
                    label="Services"
                    cells={
                        <Fragment>
                            <Cell
                                className="grid grid-rows-2 grid-cols-1"
                            >
                                <AddItem
                                    onClick={props.servicesManager.startCreateEditor}
                                />
                                <AddHelper
                                    servicesManager={props.servicesManager}
                                />
                            </Cell>
                            {[...Object.entries(props.servicesManager.newItems), ...padArray(Object.entries(props.servicesManager.newItems).length + 1, [null, null])].map(([itemID, item], i) => (
                                <Fragment key={itemID || i}>
                                    <Cell>
                                        {(item && itemID) &&
                                            <UpdateItem
                                                canEdit={true}
                                                canDelete={true}
                                                onUpdate={() => props.servicesManager.startUpdateEditor(itemID)}
                                                onDelete={() => props.servicesManager.deleteItemByDisplay(itemID)}
                                            >
                                                <ServiceItem
                                                    service={item}
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
                    changesMade={JSON.stringify(props.servicesManager.oldItems) !== JSON.stringify(props.servicesManager.newItems)}
                    onSave={props.servicesManager.saveUpdates}
                    onReset={props.servicesManager.resetUpdates}
                />
            }
        />
    )
}
