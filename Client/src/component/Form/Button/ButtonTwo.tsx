interface ButtonTwoProps {
    id?: string;
    label: string;
    onClick: () => void;
}

export default function ButtonTwo(props: ButtonTwoProps) {
    return (
        <button 
            id={props.id || ""}
            className="mt-1 w-full bg-black border border-black rounded-lg px-4 py-2 text-white text-04 font-medium tracking-wide shadow-none hover:bg-black hover:border-black hover:text-white transition-all"
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}