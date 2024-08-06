import Logo from "@/components/Logo/Logo"

export default function Nav() {
    return (
        <div>
            <nav>
                <Logo/>
                <div>
                    <span>Home</span>
                    <span>Schedule</span>
                    <span>Lookup</span>
                </div>
            </nav>
        </div>
    )
}