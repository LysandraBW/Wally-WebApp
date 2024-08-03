import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";

interface RepairCardProps {
    repair: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function RepairCard(props: RepairCardProps) {
    return (
        <div>
            {props.repair}
            <EditButton
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}