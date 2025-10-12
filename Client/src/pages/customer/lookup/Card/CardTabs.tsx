import { Instrumental } from "@/public/Font";
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
                "p-0"
            )}
        >
            <div 
                className={clsx(
                    "w-full",
                    "flex justify-between gap-4",
                    "bg-gray-50",
                    "border-t border-t-gray-200 border-b border-b-gray-200",
                    "overflow-clip"
                )}
            >
                {props.tabs.map((tab, i) => (
                    <button 
                        key={i}
                        onClick={() => props.selectTab(tab)}
                        className={clsx(
                            "w-full",
                            "py-1 px-4",
                            "rounded-none",
                            "hover:bg-gray-100",
                            props.tab === tab && `
                                bg-white 
                                ring-1 ring-gray-200
                                transition-all hover:bg-white
                            `
                        )}
                    >
                        <span
                            className={clsx(
                                "relative",
                                Instrumental.className,
                                "text-01 text-gray-500",
                                "uppercase tracking-wide",
                                props.tab === tab && "text-gray-600 font-medium"
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