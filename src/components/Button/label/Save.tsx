interface SaveProps {
    onClick: () => void;
}

export default function Save(props: SaveProps) {
    return (
        <button onClick={() => props.onClick()}>
            Save
        </button>
    )
}