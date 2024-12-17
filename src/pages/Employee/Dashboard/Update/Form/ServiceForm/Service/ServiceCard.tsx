import Delete from "@/components/button/label/Delete";
import Edit from "@/components/button/label/Edit";

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
            <Edit
                onClick={props.onEdit}
            />
            <Delete
                onClick={props.onDelete}
            />
        </div>
    )
}