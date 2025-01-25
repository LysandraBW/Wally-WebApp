import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { Parts } from "./_DEF";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import PartItem from "@/pages/employee/view/PartItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";

export default function PartDisplay<Items extends Parts>(props: DisplayProps<Items>) {
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