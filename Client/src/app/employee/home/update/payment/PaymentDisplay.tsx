import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DisplayItems, { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import { Payments } from "./_DEF";
import PaymentItem from "@/pages/items/PaymentItem";

export default function PaymentDisplay<A extends Payments>(props: DisplayProps<A>) {
    return (
        <DisplayItems
            items={
                Object.entries(props.items).map(([itemID, item], i) => (
                    <div 
                        key={i} 
                        className=""
                    >
                        <UpdateItem
                            canEdit={parseInt(itemID) < 0}
                            canDelete={true}
                            onUpdate={() => props.onUpdate(itemID)}  
                            onDelete={() => props.onDelete(itemID)}
                        >
                            <PaymentItem
                                payment={item}
                            />
                        </UpdateItem>
                    </div>
                ))}
        />
    )
}