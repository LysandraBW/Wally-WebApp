import PartDisplay from "./PartDisplay";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { DB_AppointmentPart } from "@/services/DB/Interface/Appointment";
import { DefinePart, Parts, PartUpdates } from "./_DEF";
import PartForm from "./PartForm";
import ItemManager from "@/features/ItemManager/ItemManager";
import { UseForm } from "@/features/Form/useForm/useForm";

interface PartManagerProps {
    parentForm: UseForm;
    partList: Array<DB_AppointmentPart>;
    onSaveUpdates: (updates: PartUpdates) => void;
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
        <div>
            <ItemManager
                itemList={props.partList}
                defineItem={definePart}
                parentForm={props.parentForm}
                Form={PartForm}
                Display={PartDisplay}
                saveAllUpdates={processUpdates}
            />
        </div>
    )
}
