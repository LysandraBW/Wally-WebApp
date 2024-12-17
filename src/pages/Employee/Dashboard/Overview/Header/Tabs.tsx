import { PageContext } from "@/process/Employee/Home/Context";
import { useContext } from "react";

interface TabsProps {
    updateFilter: (filter: {[k: string]: any}) => void;
}

export default function Tabs(props: TabsProps) {
    const context = useContext(PageContext);
    const filters = {
        All: {StatusID: null, Deleted: 0, LabelID: null},
        New: {StatusID: null, Deleted: 0, LabelID: -1},
        Deleted: {StatusID: null, Deleted: 0},
    }

    return (
        <div>
            <span onClick={async () => props.updateFilter(filters.All)}>All</span>
            {context.Categories.Statuses.map(({Status, StatusID}, i) => (
                <span
                    key={i}
                    onClick={async () => props.updateFilter({StatusID: StatusID, Deleted: 0})}
                >
                    {Status}
                </span>
            ))}
            <span onClick={async () => props.updateFilter(filters.Deleted)}>Deleted</span>
            <span onClick={async () => props.updateFilter(filters.New)}>New</span>
        </div>
    )
}