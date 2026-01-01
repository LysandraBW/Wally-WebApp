import clsx from "clsx";
import { ReactNode } from "react";

export default function Tag(props: {text: string; Icon: ReactNode}) {
    return (
        <div
            className={clsx(
                "block w-min relative",
                "flex gap-2 items-center"
            )}
        >
            <div className="block relative z-10 stroke-white dark:stroke-base-500 fill-none">
                {props.Icon}
            </div>
            <span className="block relative z-10 whitespace-nowrap text-white dark:text-base-500 text-xs tracking-wide text-center">
                {props.text}
            </span>
        </div>
    )
}