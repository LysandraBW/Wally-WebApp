import clsx from "clsx";
import { ReactNode } from "react";

export default function Wrapper(props: {outerClassName?: string; innerClassName?: string; children?: ReactNode}) {
    return (
        <div 
            className={clsx(
                "w-full h-full p-[1px]",
                "bg-gradient-to-b from-base-300 dark:!from-base-200 to-transparent dark:from-base-50 rounded-md",
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