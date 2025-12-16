import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DisplayItems, { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import { Repairs } from "./_DEF";
import RepairItem from "@/pages/items/RepairItem";


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