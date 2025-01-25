import RepairDisplay from "./RepairDisplay";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import { DB_AppointmentRepair } from "@/services/DB/Interface/Appointment";
import { DefineRepair, Repairs, RepairUpdates } from "./_DEF";
import RepairForm from "./RepairForm";
import ItemManager from "@/features/ItemManager/ItemManager";
import { UseForm } from "@/features/Form/useForm/useForm";

interface RepairManagerProps {
    parentForm: UseForm;
    repairList: Array<DB_AppointmentRepair>;
    onSaveUpdates: (updates: RepairUpdates) => void;
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
        <div>
            <ItemManager
                itemList={props.repairList}
                defineItem={defineRepair}
                parentForm={props.parentForm}
                Form={RepairForm}
                Display={RepairDisplay}
                saveAllUpdates={processUpdates}
            />
        </div>
    )
}
