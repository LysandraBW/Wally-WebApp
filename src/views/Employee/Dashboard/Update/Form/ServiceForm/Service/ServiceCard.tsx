import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";

interface ServiceCardProps {
    class: string;
    division: string;
    service: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ServiceCard(props: ServiceCardProps) {
    return (
        <div>
            {props.class}
            {props.service}
            {props.division}
            <EditButton
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}