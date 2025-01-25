import { DB_AppointmentPayment } from "@/services/DB/Interface/Appointment";
import { Payment } from "../edit/finance/payment/_DEF";
import { ReactNode, useEffect, useState } from "react";
import { toDisplayDate } from "@/utils/format/toDisplayDate";
import Item from "@/features/ItemManager/Item/Item";

interface PaymentItemProps {
    payment: DB_AppointmentPayment | Payment;
}

export default function PaymentItem(props: PaymentItemProps) {
    const [tags, setTags] = useState<Array<Array<ReactNode>>>();

    useEffect(() => {
        const tags = [];
        tags.push(toDisplayDate(props.payment.PaymentDate));
        if (!props.payment.Name)
            return;
        tags.push(props.payment.Type);
        tags.push(`${props.payment.EXP.substring(0, 2)}/${props.payment.EXP.substring(2)}`);
        setTags([tags]);
    }, []);

    return (
        <Item
            ID={parseInt(props.payment.PaymentID)}
            head={"$" + props.payment.Payment}
            tags={tags || []}
        />
    )
}