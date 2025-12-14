import { DisplayProps } from "@/features/ItemManager/ItemManager";
import { MappedNotes } from "./_DEF";
import UpdateItem from "@/features/ItemManager/Item/UpdateItem";
import DisplayItems from "@/features/ItemManager/Item/DisplayItems";
import NoteItem from "@/pages/employee/view/NoteItem";

export default function NoteDisplay<A extends MappedNotes>(props: DisplayProps<MappedNotes>) {
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