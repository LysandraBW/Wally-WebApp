import clsx from "clsx";

interface TabsProps {
    tab: string;
    tabs: Array<string>;
    selectTab: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    return (
        <div 
            className={clsx(
                // "flex justify-between gap-4 px-1 py-1",
                // "bg-white border-b border-gray-200"
                "p-0"
            )}
        >
            <div 
                className={clsx(
                    "w-full flex gap-4 px-[0px] justify-between",
                    "bg-gray-50 border-t border-b border-t-gray-200 border-b-gray-200 overflow-clip"
                )}
            >
                {props.tabs.map((tab, i) => (
                    <button 
                        key={i}
                        onClick={() => props.selectTab(tab)}
                        className={clsx(
                            "w-min py-1 px-4 w-full rounded-none hover:bg-gray-100",
                            props.tab === tab && `
                                bg-white 
                                shadow ring-1 ring-gray-200
                                hover:bg-white transition-all
                            `
                        )}
                    >
                        <span
                            className={clsx(
                                "text-01 text-gray-500 relative tracking-wide",
                                props.tab === tab && "text-gray-950 font-medium"
                            )}
                        >
                            {tab}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}