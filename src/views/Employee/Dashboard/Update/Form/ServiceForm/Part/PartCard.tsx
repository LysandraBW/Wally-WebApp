import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";

interface PartCardProps {
    partName: string;
    unitCost: string;
    quantity: string;
    partNumber: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function PartCard(props: PartCardProps) {
    return (
        <div>
            {props.partName}
            {props.quantity}
            {props.unitCost}
            {props.partNumber}
            <EditButton
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}