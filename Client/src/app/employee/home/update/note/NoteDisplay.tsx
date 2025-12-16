import UpdateItem from "@/features/ItemManager/components/UpdateItem";
import DisplayItems, { DisplayProps } from "@/features/ItemManager/components/DisplayItems";
import { Notes } from "./_DEF";
import NoteItem from "@/pages/items/NoteItem";

export default function NoteDisplay<A extends Notes>(props: DisplayProps<A>) {
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