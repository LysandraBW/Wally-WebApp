import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { Repair } from "../edit/service/repair/_DEF";
import Item from "@/features/ItemManager/Item/Item";
import { toInteger } from "@/utils/convert";

interface RepairItemProps {
    repair: DB_AppointmentRepair | Repair;
}

export default function RepairItem(props: RepairItemProps) {
    return (
        <Item
            ID={toInteger(props.repair.RepairID)}
            head={props.repair.Repair}
            tags={[]}
        />
    )
}