import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DisplayItems, { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import { Parts } from "./_DEF";
import PartItem from "@/pages/items/PartItem";

export default function PartDisplay<A extends Parts>(props: DisplayProps<A>) {
    return (
        <DisplayItems
            items={
                Object.entries(props.items).map(([itemID, item], i) => (
                    <div key={i}>
                        <UpdateItem
                            canEdit={true}
                            canDelete={true}
                            onDelete={() => props.onDelete(itemID)}
                            onUpdate={() => props.onUpdate(itemID)}
                        >           
                            <PartItem
                                part={item}
                            />
                        </UpdateItem>
                    </div>
                ))
            }
        />
    )
}