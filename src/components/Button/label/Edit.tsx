interface EditProps {
    onClick: () => void;
}

export default function Edit(props: EditProps) {
    return (
        <button onClick={() => props.onClick()}>
            Edit
        </button>
    )
}