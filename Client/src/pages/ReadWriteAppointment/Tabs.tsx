import clsx from "clsx";

interface TabsProps {
    tab: string;
    tabs: Array<string> | string[][];
    changesMade?: {[k: string]: boolean};
    onClick: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    return (
        <div 
            id="Tabs"
            className="p-2 flex gap-2 border-b border-base-300 dark:border-base-200"
        >
            {props.tabs.map((tab, i) => {
                const hasID = Array.isArray(tab);
                const tabID = hasID ? tab[0] : tab as string;
                const tabName = hasID ? tab[1] : tab as string;
                const selected = hasID ? tab[0] === props.tab : tab === props.tab;
                
                return (
                    <button
                        key={i}
                        onClick={() => props.onClick(tabID)}
                        className={clsx(
                            "w-full py-1 px-2",
                            "flex justify-center gap-1 items-center",
                            "text-xs tracking-wide whitespace-nowrap",
                            "shadow-sm",
                            !selected && "surface-border bg-base-50 hover:bg-base-200 dark:hover:bg-black dark:bg-base-50 text-base-500 dark:text-base-400",
                            selected && "surface-border bg-base-0 dark:bg-base-200 text-base-700 font-medium"
                        )}
                    >
                        {(props.changesMade && props.changesMade[tabID]) &&
                            <div className="ml-1 w-1 h-1 rounded-full bg-blue-500"/>
                        }
                        {tabName}
                    </button>
                )
            })}
        </div>
    )
}