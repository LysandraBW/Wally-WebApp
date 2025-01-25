import { UseForm } from "@/features/Form/useForm/useForm";
import { Cost, CostUpdates } from "./_DEF";
import CostForm from "./CostForm";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";

interface CostManagerProps {
    parentForm: UseForm;
    cost: string;
    onSaveUpdates: (updates: CostUpdates) => void;
}

export default function CostManager(props: CostManagerProps) {
    const processUpdates = (oldCost: Cost, newCost: Cost) => {
        const updates = {
            Cost: updatedValue(oldCost.Cost, newCost.Cost)
        } as CostUpdates;
        props.onSaveUpdates(updates);
    }

    return (
        <div>
            <CostForm
                parent={props.parentForm}
                cost={props.cost}
                onSaveUpdates={processUpdates}
            />
        </div>
    )
}