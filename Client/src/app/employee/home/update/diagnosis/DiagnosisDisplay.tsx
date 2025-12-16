import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DisplayItems, { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import { Diagnoses } from "@/app/employee/home/update/diagnosis/_DEF";
import DiagnosisItem from "@/pages/items/DiagnosisItem";

export default function DiagnosisDisplay<A extends Diagnoses>(props: DisplayProps<A>) {
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
                            <DiagnosisItem
                                diagnosis={item}
                            />
                        </UpdateItem>
                    </div>
                ))
            }
        />
    )
}