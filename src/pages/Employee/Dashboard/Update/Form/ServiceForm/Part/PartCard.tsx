import Delete from "@/components/button/label/Delete";
import Edit from "@/components/button/label/Edit";

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
            <Edit
                onClick={props.onEdit}
            />
            <Delete
                onClick={props.onDelete}
            />
        </div>
    )
}