import { PageContext } from "@/app/Employee/Dashboard/Dashboard/page";
import { useContext } from "react";


interface TabsProps {
    updateFilter: (filter: {[k: string]: any}) => void;
}

export default function Tabs(props: TabsProps) {
    const context = useContext(PageContext);
    
    return (
        <div>
            <span
                onClick={async () => await props.updateFilter({StatusID: null, Deleted: 0, LabelID: null})}
            >
                All
            </span>
            {context.Categories.Statuses.map(({Status, StatusID}, i) => (
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
                onClick={async () => {
                    console.log('New');
                    await props.updateFilter({StatusID: null, Deleted: 0, LabelID: -1});
                }} 
            >
                New
            </span>
        </div>
    )
}