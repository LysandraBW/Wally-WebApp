import Logo from "./Logo";
import LinkLanding from "./LinkLanding";
import clsx from "clsx";
import { HREF_LOOKUP, HREF_SCHEDULE } from "@/utils/constants";

export default function NavBarLanding() {
    return (
        <nav 
            className={
                clsx(
                    `relative px-4 py-3 z-[90]`,
                    `flex justify-between items-center gap-4`,
                    `shadow-sm`,
                    `after after:w-[calc(100%-2rem)] after:h-[1px]`,
                    `after:absolute after:bottom-0 after:left-4`,
                    `after:bg-gradient-to-l after:to-[#262640] after:to-20% after:from-[#171726] after:opacity-50`
                )
            }
        >
            <Logo
                svgClassName="fill-blue-600 color-blue-600 text-blue-600"
                textClassName="text-white font-medium"
            />
            <div className="flex gap-4">
                <LinkLanding link="Schedule" href={HREF_SCHEDULE}/>
                <LinkLanding link="Lookup" href={HREF_LOOKUP}/>
            </div>
        </nav>
    )
}