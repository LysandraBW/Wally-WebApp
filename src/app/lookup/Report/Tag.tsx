import clsx from "clsx";

export default function Tag(props: {k: string; v: string;}) {
    return (
        <div
            className={clsx(
                "w-full p-4",
                "flex flex-col items-start gap-1",
                "bg-base-50 dark:bg-base-0",
                "border-r border-base-300 dark:border-base-200 last:border-r-0"
            )}
        >
            <span className="block relative z-10 md:whitespace-nowrap text-base-500 dark:text-base-400 text-sm tracking-wide">
                {props.k}
            </span>
            <span className="block relative z-10 md:whitespace-nowrap text-base-700 text-sm tracking-wide font-medium">
                {props.v}
            </span>
        </div>
    )
}