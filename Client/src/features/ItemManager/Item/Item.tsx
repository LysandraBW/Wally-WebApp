import { Inter } from "@/public/Font";
import clsx from "clsx";
import { ReactNode } from "react";

interface ItemProps {
    ID: number;
    head: ReactNode;
    tags: Array<Array<ReactNode>>;
}

export default function Item(props: ItemProps) {
    return (
        <div className={clsx(
            "bg-white shadow-sm",
            "rounded-md border border-gray-300"
        )}>
            <div className="p-2">
                <div className="flex items-center">
                    <span 
                        className={clsx(
                            "font-medium",
                            "text-gray-400 text-00",
                            "tracking-wide"
                        )}
                    >
                        {props.ID === -1 ? "New" : `ID: ${props.ID}`}
                    </span>
                </div>
                <span 
                    className={clsx(
                        "font-medium",
                        "text-gray-950 text-03",
                        "tracking"
                    )}
                >
                    {props.head}
                </span>
            </div>
            {props.tags.map((tags, i) => (
                <div 
                    key={i}
                    className={clsx(
                        "flex items-center p-2 gap-1",
                        "rounded-b-lg bg-gray-50 border-t border-t-gray-200",
                        "scroll-hide"
                    )}
                >
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className={clsx(
                                "text-00 font-medium tracking-wide",
                                "tag shadow-xs",
                                "border-solid border-gray-200 text-gray-400",
                                "flex gap-1"
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    )
}