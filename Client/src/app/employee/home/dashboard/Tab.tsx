import useFilterManager from "@/pages/employee/dashboard/managers/useFilterManager";
import clsx from "clsx";
import { ReactNode } from "react"

interface TabProps {
    icon: ReactNode;
    label: string;
    labelID: string;
    filterManager: ReturnType<typeof useFilterManager>;
    onClick: () => void;
}

export default function Tab(props: TabProps) {
    return (
        <div 
            className={clsx(
                "w-full py-1 px-2 pr-2",
                "flex justify-between items-center gap-1",
                "border border-gray-300 rounded",
                "bg-white shadow-sm",
                "group hover:bg-gray-50 cursor-pointer",
                props.filterManager.labelID === props.labelID && `
                    !bg-blue-600
                    !border-blue-500
                `
            )}
            onClick={() => props.onClick()}
        >
            <div className="flex gap-1 items-center">
                <span 
                    className={clsx(
                        "block stroke-gray-400 group-hover:stroke-black", 
                        props.filterManager.labelID === props.labelID && "!stroke-white"
                    )}
                >
                    {props.icon}
                </span>
                <span 
                    className={clsx(
                        "tracking-wide text-xs group-hover:text-black", 
                        props.filterManager.labelID === props.labelID && "font-medium !text-white"
                    )}
                >
                    {props.label}
                </span>
            </div>
        </div>
    )
}

export function GeneralIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
        </svg>
    )
}

export function FlaggedIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
    )
}

export function DeletedIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-[14px] h-[14px] stroke-inherit">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}