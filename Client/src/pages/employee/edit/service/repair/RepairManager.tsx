import RepairDisplay from "./RepairDisplay";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { Repair as DB_AppointmentRepair } from "waltronics-types"
import { DefineRepair, Repairs, RepairUpdates } from "./_DEF";
import RepairForm from "./RepairForm";
import ItemManager from "@/features/ItemManager/ItemManager";
import { UseForm } from "@/features/Form/useForm/useForm";

interface RepairManagerProps {
    parentForm: UseForm;
    repairList: Array<DB_AppointmentRepair>;
    onSaveUpdates: (updates: RepairUpdates) => void;
    // Forms
    tabOpen: boolean;
    openForm: (form: string) => void;
    openFormDisplayed: string;
    openForms: Array<string>;
    closeForm: (form: string) => void;
}

export default function RepairManager(props: RepairManagerProps) {
    const defineRepair = new DefineRepair();
    
    const processUpdates = (oldItems: Repairs, newItems: Repairs) => {
        const itemID = "RepairID";
        const mutateKeys = ["Repair"];
        const updates = buildUpdate(oldItems, newItems, itemID, mutateKeys, mutateKeys, itemID);
        props.onSaveUpdates(updates);
    }

    return (
        <ItemManager
            itemList={props.repairList}
            defineItem={defineRepair}
            parentForm={props.parentForm}
            Form={RepairForm}
            Display={RepairDisplay}
            saveAllUpdates={processUpdates}
            tabOpen={props.tabOpen}
            openForm={props.openForm}
            openFormDisplayed={props.openFormDisplayed}
            openForms={props.openForms}
            closeForm={props.closeForm}
            tab="Repairs"
        />
    )
}
