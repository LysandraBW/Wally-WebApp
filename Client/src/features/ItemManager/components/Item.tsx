import { Inter } from "@/public/fonts/Font";
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
            "h-full flex flex-col justify-between"
        )}>
            <div className="p-2">
                <div className="flex items-center">
                    <span 
                        className={clsx(
                            "block",
                            "text-gray-500 text-xs",
                            "tracking-wide"
                        )}
                    >
                        {props.ID === -1 ? "New" : `ID: ${props.ID}`}
                    </span>
                </div>
                <span 
                    className={clsx(
                        "block",
                        "font-medium tracking-wide",
                        "text-base-900 text-xs",
                    )}
                >
                    {props.head}
                </span>
            </div>
            {props.tags.map((tags, i) => (
                <div 
                    key={i}
                    className={clsx(
                        "flex items-center p-2 gap-2",
                        "bg-base-50 dark:bg-base-50 border-t border-t-base-200",
                        "scroll-hide"
                    )}
                >
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className={clsx(
                                "block px-2 py-0.5 text-xs tracking-wide",
                                "tag shadow-sm bg-base-0 dark:bg-base-50",
                                "border border-base-300 dark:border-base-200 rounded-full text-base-700",
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