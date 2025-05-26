import PartDisplay from "./PartDisplay";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { Part as DB_AppointmentPart } from "waltronics-types";
import { DefinePart, Parts, PartUpdates } from "./_DEF";
import PartForm from "./PartForm";
import ItemManager from "@/features/ItemManager/ItemManager";
import { UseForm } from "@/features/Form/useForm/useForm";

interface PartManagerProps {
    parentForm: UseForm;
    partList: Array<DB_AppointmentPart>;
    onSaveUpdates: (updates: PartUpdates) => void;
    // Forms
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
}

export default function PartManager(props: PartManagerProps) {
    const definePart = new DefinePart();
    
    const processUpdates = (oldItems: Parts, newItems: Parts) => {
        const itemID = "PartID";
        const mutateKeys = ["PartName", "PartNumber", "Quantity", "UnitCost"];
        const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, itemID);
        props.onSaveUpdates(updates);
    }

    return (
        <ItemManager
            itemList={props.partList}
            defineItem={definePart}
            parentForm={props.parentForm}
            Form={PartForm}
            Display={PartDisplay}
            saveAllUpdates={processUpdates}
            tabOpen={props.tabOpen}
            openForm={props.openForm}
            openFormDisplayed={props.openFormDisplayed}
            openForms={props.openForms}
            closeForm={props.closeForm}
            tab="Parts"
        />
    )
}
