import clsx from "clsx";

export default function LinkLanding(props: {link: string, href: string}) {
    return (
        <a 
            href={props.href} 
            className={clsx(
                `border border-blue-500 bg-blue-600 shadow-[red_0px_2px_0px_0px] shadow-blue-800 hover:bg-blue-700`,
                `px-3 py-1.5 rounded-md text-gray-200 text-sm tracking-wide- font-medium text-black cursor-pointer transition-all`
            )}
        >
            {props.link}
        </a>
    )
}