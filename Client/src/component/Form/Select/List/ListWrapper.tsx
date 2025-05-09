export default function ListWrapper(props: {children: React.ReactNode}) {
    return (
        <ul className="px-0 top-[calc(100%+0.25rem)] z-10 field bg-white max-h-[200px] overflow-y-scroll">
            {props.children}
        </ul>
    )
}