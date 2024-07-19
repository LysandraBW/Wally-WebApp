interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button onClick={() => props.onClick()}>
            {props.label}
        </button>
    )
}