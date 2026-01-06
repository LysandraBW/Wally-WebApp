import { Repair as DB_AppointmentRepair } from "waltronics-types";
import Item from "@/features/ItemManager/components/Item";
import { toInteger } from "@/utils/convert";
import { Repair } from "@/app/employee/home/update/repair/_DEF";

interface RepairItemProps {
    repair: DB_AppointmentRepair | Repair;
}

export default function RepairItem(props: RepairItemProps) {
    return (
        <Item
            ID={toInteger(props.repair?.RepairID)}
            head={props.repair?.Repair}
            tags={[]}
        />
    )
}