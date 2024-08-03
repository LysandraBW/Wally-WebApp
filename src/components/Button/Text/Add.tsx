interface AddProps {
    onClick: () => void;
}

export default function AddButton(props: AddProps) {
    return (
        <button onClick={() => props.onClick()}>Add</button>
    )
}