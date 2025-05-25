import clsx from "clsx";

interface TabsProps {
    tab: string;
    tabs: Array<string>;
    onTabClick: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    return (
         <div className="w-full flex justify-between gap-4 bg-gray-50 border-b- border-b-gray-300">
            {props.tabs.map((tab, i) => (
                <div
                    key={i}
                    className={clsx("first:border-l-0 last:border-r-0", props.tab === tab && "shadow-sm border-l border-l-gray-300 border-r border-r-gray-300")}
                >
                    <button 
                        onClick={() => props.onTabClick(tab)}
                        className={clsx("py-2 px-4 w-full hover:bg-gray-100", props.tab === tab && `!bg-white shadow-sm`)}
                    >
                        <span className={clsx("relative text-03 tracking-wide", props.tab === tab && `text-gray-950 font-medium`)}>
                            {tab}
                        </span>
                    </button>
                </div>
            ))}
        </div>
    )
}