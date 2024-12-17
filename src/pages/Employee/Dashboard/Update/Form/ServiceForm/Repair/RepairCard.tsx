import Delete from "@/components/button/label/Delete";
import Edit from "@/components/button/label/Edit";

interface RepairCardProps {
    repair: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function RepairCard(props: RepairCardProps) {
    return (
        <div>
            {props.repair}
            <Edit
                onClick={props.onEdit}
            />
            <Delete
                onClick={props.onDelete}
            />
        </div>
    )
}