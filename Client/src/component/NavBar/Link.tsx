export default function Link(props: {link: string, href: string}) {
    return (<a href={props.href} className={`px-2 py-2 rounded-md shadow-none text-black text-sm tracking-wide font-[400] text-black cursor-pointer transition-all`}>{props.link}</a>)
}