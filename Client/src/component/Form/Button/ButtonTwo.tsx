interface ButtonTwoProps {
    id?: string;
    label: string;
    onClick: () => void;
}

export default function ButtonTwo(props: ButtonTwoProps) {
    return (
        <button 
            id={props.id || ""}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-black font-medium tracking-wide text-05 shadow-sm hover:bg-black hover:border-black hover:text-white transition-all"
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}