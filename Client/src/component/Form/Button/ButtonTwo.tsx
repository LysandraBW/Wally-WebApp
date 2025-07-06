interface ButtonTwoProps {
    id?: string;
    label: string;
    onClick: () => void;
}

export default function ButtonTwo(props: ButtonTwoProps) {
    return (
        <button 
            id={props.id || ""}
            className="!cursor-pointer mt-1 w-full bg-blue-600 border border-blue-700 rounded-lg px-4 py-2 text-white text-04 font-medium tracking-wide shadow-[inset_0px_2px_0_0_#ffffff2b] hover:bg-black hover:border-black hover:text-white transition-all"
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}