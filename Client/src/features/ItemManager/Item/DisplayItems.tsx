import clsx from "clsx";
import { ReactNode } from "react"

interface DisplayItemsProps {
    items: Array<ReactNode>;
}

// This just wraps around an array of Items,
// of which, we have many. With this component,
// the layouts should be similar.

export default function DisplayItems(props: DisplayItemsProps) {
    return (
        <div 
            className={clsx(
                "w-min max-h-[300px]",
                "flex flex-col flex-wrap gap-4",
                "overflow-x scroll-hide"
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