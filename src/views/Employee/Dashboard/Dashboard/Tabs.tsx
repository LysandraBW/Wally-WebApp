import { Status } from "@/lib/Database/Info/Info";

interface TabsProps {
    statuses: Array<Status>;
    updateFilter: (filter: {[k: string]: any}) => void;
}

export default function Tabs(props: TabsProps) {
    return (
        <div>
            <span
                onClick={async () => await props.updateFilter({StatusID: null, Deleted: 0})}
            >
                All
            </span>
            {props.statuses.map(({Status, StatusID}, i) => (
                <span
                    key={i}
                    onClick={async () => await props.updateFilter({StatusID: StatusID, Deleted: 0})}
                >
                    {Status}
                </span>
            ))}
            <span
                onClick={async () => await props.updateFilter({StatusID: null, Deleted: 1})} 
            >
                Deleted
            </span>
            <span
                onClick={async () => await props.updateFilter({StatusID: null, LabelID: -1})} 
            >
                New
            </span>
        </div>
    )
}