interface EditButtonProps {
    onClick: () => void;
}

export default function EditButton(props: EditButtonProps) {
    return (
        <button onClick={() => props.onClick()}>
            Edit
        </button>
    )
}