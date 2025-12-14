import { DisplayProps } from "@/features/ItemManager/ItemManager";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import PaymentItem from "@/pages/employee/view/PaymentItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";
import { MappedPayments } from "./_DEF";

export default function PaymentDisplay<A extends MappedPayments>(props: DisplayProps<A>) {
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