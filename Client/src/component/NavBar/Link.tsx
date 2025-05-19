export default function Link(props: {link: string, href: string}) {
    return (<a href={props.href} className={`bg-white border border-white px-2 py-2 rounded-md shadow-none text-black text-sm tracking-wide font-[400] text-black hover:bg-gray-100 hover:border-gray-300 hover:text-black hover:shadow-none cursor-pointer transition-all`}>{props.link}</a>)
}