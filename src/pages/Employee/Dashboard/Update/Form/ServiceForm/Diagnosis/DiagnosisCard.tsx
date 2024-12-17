import Delete from "@/components/button/label/Delete";
import Edit from "@/components/button/label/Edit";

interface DiagnosisCardProps {
    code: string;
    message: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function DiagnosisCard(props: DiagnosisCardProps) {
    return (
        <div>
            <p>{props.code} - {props.message}</p>
            <Edit
                onClick={props.onEdit}
            />
            <Delete
                onClick={props.onDelete}
            />
        </div>
    )
}