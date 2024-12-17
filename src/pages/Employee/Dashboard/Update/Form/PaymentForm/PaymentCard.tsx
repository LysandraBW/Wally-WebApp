import Delete from "@/components/button/label/Delete";
import Edit from "@/components/button/label/Edit";

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
            <Edit
                onClick={props.onEdit}
            />
            <Delete
                onClick={props.onDelete}
            />
        </div>
    )
}