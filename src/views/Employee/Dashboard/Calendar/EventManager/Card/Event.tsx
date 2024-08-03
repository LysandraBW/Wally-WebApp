import DeleteButton from "@/components/Button/Text/Delete";
import EditButton from "@/components/Button/Text/Edit";

interface EventCardProps {
    name: string;
    date: string;
    summary: string;
    isEventOwner: boolean;
    ownerName: string;
    shareesName: Array<string>;
    onEdit: () => void;
    onDelete: () => void;
}

export default function EventCard(props: EventCardProps) {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.date}</p>
            <p>{props.summary}</p>
            <p>Owned By {props.ownerName}</p>
            {props.isEventOwner &&
                <div>
                    <p>Shared With</p>
                    <ul>
                        {props.shareesName.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ul>
                </div>
            }
            <EditButton 
                onClick={props.onEdit}
            />
            <DeleteButton
                onClick={props.onDelete}
            />
        </div>
    )
}