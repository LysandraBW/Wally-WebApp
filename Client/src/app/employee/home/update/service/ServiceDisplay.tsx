import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DisplayItems, { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import { Services } from "./_DEF";
import ServiceItem from "@/pages/items/ServiceItem";

export default function ServiceDisplay<A extends Services>(props: DisplayProps<A>) {
    return (
        <DisplayItems
            items={Object.entries(props.items).map(([itemID, item], i) => (
                <div key={i}>
                    <UpdateItem
                        canEdit={true}
                        canDelete={true}
                        onDelete={() => props.onDelete(itemID)}
                        onUpdate={() => props.onUpdate(itemID)}
                    >
                        <ServiceItem
                            service={item}
                        />
                    </UpdateItem>
                </div>
            ))}
        />
    )
}