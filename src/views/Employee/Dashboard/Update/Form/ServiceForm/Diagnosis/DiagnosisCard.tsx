import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";

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
            <EditButton
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}