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
                {/* <div className="bg-transparent text-black stroke-black">
                    
                </div> */}
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