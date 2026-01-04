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
            "h-full w-full grid-cols-1 grid grid-rows-[min-content_auto_min-content] justify-between"
        )}>
            <div className="flex bg-base-100 dark:bg-base-50 items-center border-b border-base-200 dark:border-base-100 justify-start">
                <span 
                    className={clsx(
                        "block  p-0.5 px-1",
                        "text-base-400 text-[0.6rem] font-medium",
                        "tracking"
                    )}
                >
                    {props.ID === -1 ? "New" : `ID: ${props.ID}`}
                </span>
            </div>
            <div className="">
                <span 
                    className={clsx(
                        "block p-1 py-2",
                        "font-medium tracking-wide",
                        "text-base-700 text-xs",
                    )}
                >
                    {props.head}
                </span>
            </div>
            {props.tags.map((tags, i) => (
                <div 
                    key={i}
                    className={clsx(
                        "flex items-center px-1 py-0.5 gap-1",
                        "bg-base-50 dark:bg-base-50 border-t border-t-base-200",
                        "scroll-hide"
                    )}
                >
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className={clsx(
                                "block px-1 py-0 text-[0.6rem] tracking-wide text-base-500",
                                "shadow-sm bg-base-0 dark:bg-base-50",
                                "border border-base-300 dark:border-base-200 rounded-[3px]",
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