import IconProps from "@/component/Icons/IconProps";
import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
    title: ReactNode;
    head: ReactNode;
    body: ReactNode;    
}


export default function Card(props: CardProps) {
    return (
        <div 
            className={clsx(
                "w-full h-full shadow-sm",
                "relative",
                "[&:nth-child(1)]:border-t md:[&:nth-child(2)]:border-t dark:[&:nth-child(1)]:border-t-0 dark:md:[&:nth-child(2)]:border-t-0 [&:nth-child(2n)]:border-l border-base-300 dark:border-base-200 [&:nth-last-child(n-2)]:border-b"
            )}
        >
            <div className="bg-base-0 h-full">
                <div className="block px-4 py-2 flex items-center gap-1.5 shadow-xs bg-base-100 dark:bg-base-50">
                    <span className="text-sm text-blue-500 font-medium">
                        {props.title}
                    </span>
                </div>
                <div className="px-4 py-2 pb-4 flex flex-col gap-1">
                    <span className="block text-lg text-base-900 font-medium">
                        {props.head}
                    </span>
                    <p className="text-sm text-base-500 dark:text-base-400 tracking-wide">
                        {props.body}
                    </p>
                </div>
            </div>
        </div>
    )
}