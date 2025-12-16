import clsx from "clsx";
import { ReactNode } from "react"

export interface DisplayProps<Items> {
    items: Items;
    onDelete: (ID: string) => void;
    onUpdate: (ID: string) => void;
}

export interface DisplayItemsProps {
    items: Array<ReactNode>;
}

// This just wraps around an array of Items,
// of which, we have many. With this component,
// the layouts should be similar.

export default function DisplayItems(props: DisplayItemsProps) {
    return (
        <div 
            className={clsx(
                "",
                "flex flex-wrap gap-4"
            )}
        >
            {props.items.map((item, i) => (
                <div 
                    key={i}
                    className="w-[300px]"
                >
                    {item}
                </div>
            ))}
        </div>
    )
}