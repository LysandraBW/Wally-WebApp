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
                "flex justify-between gap-4 px-1 py-1",
                "bg-white border-b border-gray-200"
            )}
        >
            <div 
                className={clsx(
                    "w-full flex gap-4 rounded-md",
                    "bg-gray-50 border border-gray-200"
                )}
            >
                {props.tabs.map((tab, i) => (
                    <button 
                        key={i}
                        onClick={() => props.selectTab(tab)}
                        className={clsx(
                            "py-0.5 px-3 w-full rounded-md",
                            props.tab === tab && `
                                bg-white 
                                shadow-[0px_0px_0px_1px_#E2E8F0] 
                                shadow-gray-300
                            `
                        )}
                    >
                        <span
                            className={clsx(
                                "text-01 relative",
                                props.tab === tab && "text-gray-950"
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