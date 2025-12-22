import clsx from "clsx";
import { ReactNode } from "react";

export default function Wrapper(props: {children: ReactNode}) {
    return (
        <div 
            className={clsx(
                "w-full overflow-hidden",
                "absolute top-[calc(100%+0.25rem)] z-[2]",
                "border border-base-300 rounded-md bg-base-0 shadow-sm"
            )}
        >
            {props.children}
        </div>
    )
}