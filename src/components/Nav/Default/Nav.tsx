import Logo from "@/components/Logo/Logo";
import { DMSans, Inter } from "@/public/Font/Font";
import clsx from "clsx";

interface NavProps {
    navColor: string;
    linkColor: string;
}

export default function Nav(props: NavProps) {
    const links = ['Home', 'Schedule', 'Lookup'];

    return (
        <nav className='px-8 h-[64px] flex justify-between items-center'>
            <Logo
                color={props.navColor}
            />
            <div
                className={clsx(
                    'flex gap-x-8'
                )}>
                {links.map((link, i) => (
                    <span 
                        key={i}
                        style={{
                            color: props.linkColor
                        }}
                        className={clsx(
                            Inter.className,
                            'font-[500] text-sm'
                        )}
                    >{link}</span>
                ))}
            </div>
        </nav>
    )
}