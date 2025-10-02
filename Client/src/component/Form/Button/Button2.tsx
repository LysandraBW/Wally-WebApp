import clsx from "clsx";

export interface ButtonTwoProps {
    id?: string;
    style?: string;
    label: string;
    onClick: () => void;
}

export default function ButtonTwo(props: ButtonTwoProps) {
    return (
        <button 
            id={props.id || ""}
            className={clsx(
                "w-full mt-1 px-4 py-2",
                "bg-blue-600 rounded-lg",
                "border border-blue-700",
                "font-medium text-white tracking-wide",
                "shadow-[0px_2px_3px_0px_#0000000D,inset_0px_2px_0_0_#ffffff2b]",
                "transition-all hover:bg-blue-700 hover:border-blue-800 hover:shadow-[0px_2px_3px_0px_#00000030,inset_0px_1px_0_0_#ffffff2b] hover:text-white",
                props.style
            )}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}