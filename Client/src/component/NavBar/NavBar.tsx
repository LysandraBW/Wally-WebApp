import Logo from "./Logo";
import Link from "./Link";

interface NavBarProps {
    sticky?: boolean;
    border?: boolean;
}

export default function NavBar(props: NavBarProps) {
    return (
        <nav className={`${props.border ? "border-b border-b-gray-200" : ""} ${props.sticky ? "sticky top-0" : "snap-start-"} h-[54px] flex justify-between items-center px-4 py-2 bg-white/50 backdrop-blur z-[90] shadow-sm`}>
            <Logo/>
            <div className="flex gap-4">
                <Link link="Schedule" href="/schedule"/>
                <Link link="Lookup" href="/lookup"/>
            </div>
        </nav>
    )
}