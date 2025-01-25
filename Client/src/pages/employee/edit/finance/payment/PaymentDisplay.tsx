import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { Payments } from "./_DEF";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import PaymentItem from "@/pages/employee/view/PaymentItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";

export default function PaymentDisplay<Items extends Payments>(props: DisplayProps<Items>) {
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