import Logo from "./Logo";
import Link from "./Link";
import clsx from "clsx";
import { HREF_LOOKUP, HREF_SCHEDULE } from "@/utils/constants";

export interface NavBarProps {
    sticky?: boolean;
    border?: boolean;
    background?: boolean;
}

export default function NavBar(props: NavBarProps) {
    return (
        <nav 
            className={clsx(
                "h-[54px] px-4 py-2",
                "flex justify-between items-center",
                "shadow-sm",
                "z-[90]",
                `${props.background && "bg-white/80 backdrop-blur"}`,
                `${props.border ? "border-b border-b-gray-200" : ""}`,
                `${props.sticky ? "sticky top-0" : "snap-start-"}`
            )}
        >
            <Logo/>
            <div className="flex gap-4">
                <Link link="Schedule" href={HREF_SCHEDULE}/>
                <Link link="Lookup" href={HREF_LOOKUP}/>
            </div>
        </nav>
    )
}