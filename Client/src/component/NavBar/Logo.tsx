import { DM_Sans } from "@/public/Font";
import clsx from "clsx";

interface LogoProps {
    svgClassName?: string;
    textClassName?: string;
}

export default function Logo(props: LogoProps) {
    return (
        <div>
            <a href="/" className="flex items-center gap-0">
                <div className="bg-transparent text-black stroke-black">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        strokeWidth="1" 
                        stroke="currentColor" 
                        className={clsx(
                            "size-4 fill-black",
                            props.svgClassName || ""
                        )}
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                        />
                    </svg>
                </div>
                <span 
                    className={clsx(
                        `text-black text-base tracking-wide font-medium`,
                        DM_Sans.className,
                        props.textClassName || ""
                    )}
                >
                    WALTRONICS
                </span>
            </a>
        </div>
    )
}