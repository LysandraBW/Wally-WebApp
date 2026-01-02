import IconProps from "@/component/Icons/IconProps";
import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
    title: ReactNode;
    Icon: ReactNode;
    head: ReactNode;
    body: ReactNode;    
}


export default function Card(props: CardProps) {
    return (
        <div 
            className={clsx(
                "w-full h-full surface-border-radius shadow-sm",
                "relative",
                "bg-gradient-to-b from-base-300 dark:from-base-200 to-base-300 dark:!to-base-50 p-[1px]"
            )}
        >
            <div className="bg-base-0 rounded-[5px] h-full">
                <div className="block px-2 py-2 border-b border-b-base-300 dark:border-b-base-200 flex items-center gap-1.5 shadow-xs bg-base-100 dark:bg-base-50 rounded-t-[5px]">
                    <div 
                        className={clsx(
                            "size-5",
                            "bg-blue-600 dark:bg-gradient-to-b dark:from-blue-400 dark:to-blue-500 shadow-sm dark:shadow-md",
                            "rounded-full",
                            "flex justify-center items-center",
                            "relative after:z-[1] after:w-[calc(100%-2px)] after:h-[calc(100%-2px)] after:absolute after:top-[1px] after:left-[1px] after:bg-blue-500 after:rounded-full"
                        )}
                    >
                        <div className="relative z-50 stroke-white">
                            {props.Icon}
                        </div>
                    </div>
                    <span className="text-sm text-blue-500 font-medium">
                        {props.title}
                    </span>
                </div>
                <div className="px-2 py-2 pb-4 flex flex-col gap-1">
                    <span className="block text-lg text-base-900 font-medium">
                        {props.head}
                    </span>
                    <p className="text-sm text-base-500 tracking-wide">
                        {props.body}
                    </p>
                </div>
            </div>
        </div>
    )
}