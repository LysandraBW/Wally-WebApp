import { DMSans } from "@/public/font/Font";
import clsx from "clsx";

interface LogoProps {
    color: string;
}

export default function Logo(props: LogoProps) {
    return (
        <div 
            style={{color: props.color}}
            className={clsx(
                DMSans.className,
                'font-semibold text-[24px]'
            )}
        >
            WALTRONICS
        </div>
    )
}