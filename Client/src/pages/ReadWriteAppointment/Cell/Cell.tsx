import clsx from "clsx";
import { ReactNode } from "react";

export default function Cell(props: {className?: string; children: ReactNode}) {
    return (
        <div
            className={clsx(
                "w-full h-[100px]",
                "border-b border-l border-base-300 dark:border-base-200",
                "[&:nth-child(5n+1)]:border-l-0 [&:nth-last-child(-n+5)]:border-b-0",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}