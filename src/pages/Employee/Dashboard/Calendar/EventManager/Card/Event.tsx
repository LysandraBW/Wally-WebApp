import Delete from "@/components/button/label/Delete";
import Edit from "@/components/button/label/Edit";

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
            <Edit 
                onClick={props.onEdit}
            />
            <Delete
                onClick={props.onDelete}
            />
        </div>
    )
}