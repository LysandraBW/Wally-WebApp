import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";

interface PaymentCardProps {
    payment: string;
    ccn: string;
    exp: string;
    type: string;
    name: string;
    paymentDate: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function PaymentCard(props: PaymentCardProps) {
    return (
        <div>
            <p>{props.payment}</p>
            <p>{props.paymentDate}</p>
            <div>
                {props.type}
                {props.name}
                {props.ccn}
                {props.exp}
            </div>
            <EditButton
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}