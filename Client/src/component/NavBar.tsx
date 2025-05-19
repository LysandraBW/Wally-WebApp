import { Instrumental } from "@/public/Font";
import Logo from "./Logo";

interface NavBarProps {
    sticky?: boolean;
    border?: boolean;
}

export default function NavBar(props: NavBarProps) {
    return (
        <nav className={`${props.border ? "border-b border-b-gray-200" : ""} ${props.sticky ? "sticky top-0" : "snap-start"} h-[54px] flex justify-between items-center px-4 py-2 bg-white z-[90]`}>
            <Logo
                svgClassName=""
                textClassName=""
            />
            <div className="flex gap-4">
                <a href="/schedule" className={`bg-white border border-white px-2 py-2 rounded-md shadow-none text-black text-sm tracking-wide font-[400] text-black hover:bg-gray-100 hover:border-gray-300 hover:text-black hover:shadow-none cursor-pointer transition-all`}>Schedule</a>
                <a href="/lookup" className={`bg-white border border-white px-2 py-2 rounded-md shadow-none text-black text-sm tracking-wide font-[400] text-black hover:bg-gray-100 hover:border-gray-300 hover:text-black hover:shadow-none cursor-pointer transition-all`}>Lookup</a>
            </div>
        </nav>
    )
}