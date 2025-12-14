import { DisplayProps } from "@/features/ItemManager/ItemManager";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import RepairItem from "@/pages/employee/view/RepairItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";
import { Repairs } from "@/pages/employee/edit/service/repair/_DEF";

export default function RepairDisplay<A extends Repairs>(props: DisplayProps<A>) {
    return (
        <DisplayItems
            items={Object.entries(props.items).map(([itemID, item], i) => (
                <div key={i}>
                    <UpdateItem
                        canEdit={true}
                        canDelete={true}
                        onUpdate={() => props.onUpdate(itemID)}
                        onDelete={() => props.onDelete(itemID)}
                    >
                        <RepairItem
                            repair={item}
                        />
                    </UpdateItem>
                </div>
            ))}
        />
    )
}