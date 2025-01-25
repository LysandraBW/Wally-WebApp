import clsx from "clsx";

interface TabsProps {
    tab: string;
    tabs: Array<string>;
    onTabClick: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    return (
        <div 
            className={clsx(
                "flex justify-between gap-4",
                "bg-white rounded-md"
            )}
        >
            <div 
                className={clsx(
                    "w-full flex gap-4 rounded-md",
                    "bg-gray-50 border border-gray-200"
                )}
            >
                {props.tabs.map((tab, i) => (
                    <div
                        key={i}
                        className={clsx(
                            "w-full rounded-md",
                            props.tab === tab && "shadow"
                        )}
                    >
                        <button 
                            onClick={() => props.onTabClick(tab)}
                            className={clsx(
                                "py-1 px-3 w-full rounded",
                                props.tab === tab && `
                                    bg-white 
                                    shadow-[0px_0px_0px_1px_#E2E8F0] 
                                    shadow-gray-200
                                `
                            )}
                        >
                            <span
                                className={clsx(
                                    "relative text-02 tracking-tight",
                                    props.tab === tab && `
                                        text-gray-950
                                        font-medium
                                    `
                                )}
                            >
                                {tab}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}