import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { Services } from "./_DEF";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import ServiceItem from "@/pages/employee/view/ServiceItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";

export default function ServiceDisplay<Items extends Services>(props: DisplayProps<Items>) {
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