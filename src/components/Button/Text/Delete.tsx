interface DeleteButtonProps {
    onClick: () => void;
}

export default function DeleteButton(props: DeleteButtonProps) {
    return (
        <button onClick={() => props.onClick()}>
            Delete
        </button>
    )
}