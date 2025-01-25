import Logo from "./Logo";

export default function StandardNavigation() {
    return (
        <div className="sticky top-0 z-30 border-b border-b-gray-200">
            {/* 
            This is the navigation bar, it only has the logo for now.
            I wanted to add general links, but I couldn't make it
            look good.
            */}
            <nav className={"flex justify-between items-center gap-x-8 px-4 py-3 bg-white z-30"}>
                <Logo/>
            </nav>
        </div>
    )
}