import clsx from "clsx";

export default function ListElement(props: {children: React.ReactNode, multiple: boolean}) {
    return (
        <div
            className={clsx(
                "px-3 py-1.5 flex justify-between items-center gap-2",
                props.multiple && "!justify-normal",
                "hover:bg-gray-100 hover:cursor-pointer",
            )}
        >
            {props.children}
        </div>
    )
}