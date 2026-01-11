import { Payment as DB_AppointmentPayment } from "waltronics-types";
import { Payment } from "@/app/employee/home/update/payment/_DEF";
import { ReactNode, useEffect, useState } from "react";
import { formatDate, formatMoney, toInteger } from "@/utils/convert";
import Item from "@/features/ItemManager/components/Item";

interface PaymentItemProps {
    payment: DB_AppointmentPayment | Payment;
}

export default function PaymentItem(props: PaymentItemProps) {
    const [tags, setTags] = useState<Array<Array<ReactNode>>>();

    useEffect(() => {
        const tags = [];
        
        if (!props.payment.Name) {
            setTags([["Cash"]]);
            return;
        }

        tags.push(props.payment?.Type);
        tags.push(`${props.payment?.EXP.substring(0, 2)}/${props.payment?.EXP.substring(2)}`);
        setTags([tags]);
    }, [props.payment]);

    return (
        <Item
            ID={toInteger(props.payment?.PaymentID)}
            head={formatMoney(props.payment?.Payment)}
            tags={tags || []}
        />
    )
}