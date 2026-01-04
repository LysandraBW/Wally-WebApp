import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import useServicesManager from "./useServicesManager";
import { Fragment } from "react";
import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import ServiceItem from "@/pages/items/ServiceItem";
import EntryCells from "@/pages/ReadWriteAppointment/Entry/EntryCells";
import CellAddItem, { AddItem } from "@/pages/ReadWriteAppointment/Cell/CellAddItem";
import Cell from "@/pages/ReadWriteAppointment/Cell/Cell";
import PaddingCells from "@/pages/ReadWriteAppointment/Cell/PaddingCells";
import AddHelper from "./AddHelper";

interface ServicesManagerProps {
    servicesManager: ReturnType<typeof useServicesManager>;
}

export default function ServicesManager(props: ServicesManagerProps) {
    return (
        <div 
            id="MainContent"
            className="w-full grow grid grid-rows-[auto_48px] overflow-y-clip"
        >
            <div className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50">
                <EntryCells
                    label="Parts"
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
                            {Object.entries(props.servicesManager.newItems).map(([itemID, item], i) => (
                                <Fragment key={i}>
                                    <Cell>
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
                                    </Cell>
                                </Fragment>
                            ))}
                            <PaddingCells
                                offset={1}
                                numberCells={Object.keys(props.servicesManager.newItems).length}
                            />
                        </Fragment>
                    }
                />
            </div>
            <SaveResetButtons
                onSave={props.servicesManager.saveUpdates}
                onReset={props.servicesManager.resetUpdates}
            />
        </div>
    )
}
