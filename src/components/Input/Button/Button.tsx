interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button 
            onClick={() => props.onClick()}    
        >
            <label
            >
                {props.label}
            </label>
        </button>
    )
}