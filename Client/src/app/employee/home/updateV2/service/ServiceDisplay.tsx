import { DisplayProps } from "@/features/ItemManager/ItemManager";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import ServiceItem from "@/pages/employee/view/ServiceItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";
import { Services } from "@/pages/employee/edit/service/service/_DEF";

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