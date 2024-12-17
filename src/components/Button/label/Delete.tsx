interface DeleteProps {
    onClick: () => void;
}

export default function Delete(props: DeleteProps) {
    return (
        <button onClick={() => props.onClick()}>
            Delete
        </button>
    )
}