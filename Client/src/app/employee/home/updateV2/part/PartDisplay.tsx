import { DisplayProps } from "@/features/ItemManager/ItemManager";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import PartItem from "@/pages/employee/view/PartItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";
import { Parts } from "@/pages/employee/edit/service/part/_DEF";

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