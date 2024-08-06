import Logo from "@/components/Logo/Logo"

export function MinimalNavBar() {
    return (
        <div className='relative top-0 h-[64px]'>
            <div className='absolute top-0 z-[-1] h-[64] w-full backdrop-blur-[100px]'></div>
            <nav className='h-full flex justify-between items-center z-1 p-[32px]'>
                <Logo/>
            </nav>
        </div>
    )
}