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
            "h-full w-full grid-cols-1 grid grid-rows-[min-content_auto_min-content] justify-between overflow-x-clip"
        )}>
            <div className="h-[23px] flex bg-base-100 dark:bg-[#121315] items-center border-pb border-base-200 dark:border-base-100 justify-start">
                <span 
                    className={clsx(
                        "block p-0.5 px-2",
                        "text-blue-500 text-[0.6rem] font-medium",
                        "tracking"
                    )}
                >
                    {props.ID <= -1 ? "New" : `ID: ${props.ID}`}
                </span>
            </div>
            <div className="">
                <span 
                    className={clsx(
                        "block px-2 py-2",
                        "font-medium tracking-wide",
                        "text-base-700 text-sm overflow-x-clip text-ellipsis",
                    )}
                >
                    {props.head}
                </span>
            </div>
            {props.tags.map((tags, i) => (
                <div 
                    key={i}
                    className={clsx(
                        "h-[23px] flex items-center px-0.5 py-0.5 gap-1",
                        "bg-base-100 dark:bg-[#121315]",
                        "scroll-hide overflow-x-scroll"
                    )}
                >
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className={clsx(
                                "block px-1 py-0",
                                "flex gap-1",
                                "dark:shadow-sm bg-base-0 dark:bg-base-50",
                                "surface-border dark:!border-none rounded-[3px]",
                                "text-[0.6rem] tracking-wide text-base-500 dark:text-base-400 font-medium"
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