import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { MappedDiagnoses } from "./_DEF";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import DiagnosisItem from "@/pages/employee/view/DiagnosisItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";

export default function DiagnosisDisplay<A extends MappedDiagnoses>(props: DisplayProps<A>) {
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