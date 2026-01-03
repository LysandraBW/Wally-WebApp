import clsx from "clsx";
import { ReactNode } from "react";

export default function Wrapper(props: {id?: string; outerClassName?: string; innerClassName?: string; children?: ReactNode}) {
    return (
        <div 
            id={props.id}
            className={clsx(
                "w-full h-full p-[0.5px]",
                "border border-base-300 dark:border-base-50",
                "bg-gradient-to-b from-white dark:from-base-300 to-base-100 dark:!to-base-100 rounded-[6px] shadow-sm",
                props.outerClassName
            )}
        >
            <div 
                className={clsx(
                    "bg-base-100 dark:bg-base-50 w-full h-full rounded-[5px]",
                    props.innerClassName
                )}
            >
                {props.children}
            </div>
        </div>
    )
}