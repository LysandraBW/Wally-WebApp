import { Saira } from "@/public/Font";
import BoltIcon from "../Icons/Icons/BoltIcon";
import clsx from "clsx";

interface LogoProps {
    size?: 1|2|3;    
}

export default function Logo(props: LogoProps) {
    return (
        <div
            className={`${Saira.className} w-min`}
        >
            <a 
                href="/" 
                className="flex items-center gap-1"
            >
                <BoltIcon
                    class={clsx(
                        "stroke-black fill-black dark:stroke-white dark:fill-white",
                        (props.size === 3 || !props.size) && "size-4",
                        props.size === 2 && "w-[14px] h-[14px]",
                        props.size === 1 && "w-[12px] h-[12px]",
                    )}
                />
                <span 
                    className={clsx(
                        "text-black dark:text-white tracking-tight font-medium",
                        (props.size === 3 || !props.size) && "text-2xl leading-[24px]",
                        props.size === 2 && "text-xl leading-[20px]",
                        props.size === 1 && "text-lg leading-[18px]",
                    )}
                >
                    Waltronics
                </span>
            </a>
        </div>
    )
}