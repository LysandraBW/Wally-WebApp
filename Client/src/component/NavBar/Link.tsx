import clsx from "clsx";

export default function Link(props: {link: string, href: string}) {
    return (
        <a 
            href={props.href} 
            className={clsx(
                "px-2 py-2",
                "font-[400] text-black text-sm tracking-wide",
                "rounded-md shadow-none",
                "cursor-pointer"
            )}
        >
            {props.link}
        </a>
    )
}