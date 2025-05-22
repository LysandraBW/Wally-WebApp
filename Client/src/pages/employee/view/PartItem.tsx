import { DB_AppointmentPart } from "@/services/DB/Interface/Appointment";
import { Part } from "../edit/service/part/_DEF";
import Item from "@/features/ItemManager/Item/Item";
import { toInteger } from "@/utils/convert";
import { useEffect, useState } from "react";

interface PartIemProps {
    part: DB_AppointmentPart | Part;
}

export default function PartItem(props: PartIemProps) {
    const [amountSpent, setAmountSpent] = useState(0);

    useEffect(() => {
        // I wish you could do a simple multiplication,
        // but because we're handling different versions
        // of the same object, we have to account for
        // type differences.
        let quantity = 0;
        let unitCost = 0;
        
        if (typeof props.part.UnitCost === "string")
            unitCost = parseFloat(props.part.UnitCost);
        else
            unitCost = props.part.UnitCost;

        if (typeof props.part.Quantity === "string")
            quantity = parseFloat(props.part.Quantity);
        else
            quantity = props.part.Quantity;

        setAmountSpent(unitCost * quantity);
    }, []);

    return (
        <Item
            ID={toInteger(props.part.PartID)}
            head={props.part.PartName}
            tags={[[
                `$${props.part.UnitCost}/ea.`,
                `${props.part.Quantity} Purchased`,
                `Spent ${amountSpent}`,
                props.part.PartNumber
            ]]}
        />
    )
}