import clsx from "clsx";

interface TabsProps {
    tab: string;
    tabs: Array<string>;
    onClick: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    return (
        <>
            {props.tabs.map((tab, i) => (
                <button
                    key={i}
                    onClick={() => props.onClick(tab)}
                    className={clsx(
                        "w-full py-1 px-2",
                        "text-xs tracking-wide whitespace-nowrap",
                        "shadow-sm dark:shadow-md",
                        tab !== props.tab && "surface-border hover:bg-base-200 dark:hover:bg-base-0 dark:bg-base-50 text-base-500 dark:text-base-400",
                        tab === props.tab && "surface-border bg-base-0 dark:bg-base-200 text-base-700"
                    )}
                >
                    {tab}
                </button>
            ))}
        </>
    )
}