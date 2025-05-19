export interface ButtonProps {
    type?: "button"|"reset"|"submit";
    style?: string;
    label?: string
    onClick: () => void;
    children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
    return (
        <label
            className="w-full"
        >
            <button
                type={props.type}
                className={props.style}
                onClick={props.onClick}
            >
                {props.label &&
                    <span 
                        className="whitespace-nowrap tracking-wide text-lg"
                    >
                        {props.label}
                    </span>
                }
                {props.children}
            </button>
        </label>
    )
}