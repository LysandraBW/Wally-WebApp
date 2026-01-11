import clsx from "clsx";
import { ReactNode } from "react"

interface TabProps {
    icon: ReactNode;
    name: string;
    href: string;
    currentTab: boolean;
}


export default function NavBarTab(props: TabProps) {
    return (
        <a 
            href={props.href}
            className={clsx(
                "p-[0.5px] rounded-[5px] cursor-pointer",
                !props.currentTab && "hover:bg-base-200 dark:hover:bg-base-0",
                props.currentTab && "bg-gradient-to-b from-blue-200 to-blue-600/90 shadow border border-blue-500"
            )}
        >
            <div 
                className={clsx(
                    "px-1 py-1 flex items-center gap-2",
                    "text-base-500 dark:text-base-400 stroke-base-500 dark:stroke-base-400",
                    props.currentTab && "bg-gradient-to-b from-blue-500 to-blue-600 rounded-[4px] !text-white !stroke-white"
                )}
            >
                {props.icon}
                <span className="text-inherit text-xs tracking-wide whitespace-nowrap">
                    {props.name}
                </span>
            </div>
        </a>
    )
}