interface AddProps {
    onClick: () => void;
}

export default function Add(props: AddProps) {
    return (
        <button onClick={() => props.onClick()}>
            Add
        </button>
    )
}