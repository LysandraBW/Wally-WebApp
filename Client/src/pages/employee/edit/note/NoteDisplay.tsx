import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { Notes } from "./_DEF";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import NoteItem from "../../view/NoteItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";

export default function NoteDisplay<Items extends Notes>(props: DisplayProps<Items>) {
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
                            <NoteItem
                                note={item}
                            />
                        </UpdateItem>
                    </div>
            ))}
        />
    )
}