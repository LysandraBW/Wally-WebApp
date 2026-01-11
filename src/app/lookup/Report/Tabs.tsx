import clsx from "clsx";

export default function Tabs(props: {tabs: Array<string>; tab: string; setTab: (tab: string) => void}) {
    return (
        <div className="flex gap-x-4 relative bg-base-0 w-full p-4 border-b border-base-300 dark:border-base-200 bg-base-100 dark:bg-base-50">
            {props.tabs.map((t, i) => (
                <div
                    key={i}
                    className={clsx(
                        "block py-1 px-2 w-full flex justify-center items-center",
                        "cursor-pointer shadow-sm",
                        "rounded-[5px]",
                        t !== props.tab && "bg-base-0 surface-border",
                        t === props.tab && `
                            relative z-[1]
                            bg-gradient-to-b from-blue-100 to-blue-600 border !border-blue-500
                            after:w-[calc(100%-1px)] after:h-[calc(100%-1px)] after:bg-gradient-to-b after:from-blue-500 after:to-blue-600 after:absolute after:rounded after:z-[10] after:top-[0.5px] after:left-[0.5px]
                        `
                    )}
                    onClick={() => props.setTab(t)}
                >
                    <span 
                        className={clsx(
                            "block relative z-20",
                            "text-sm tracking-wide",
                            t !== props.tab && "text-base-500 dark:text-base-400",
                            t === props.tab && "text-white font-medium"
                        )}
                    >
                        {t}
                    </span>
                </div>
            ))}
        </div>
    )
}