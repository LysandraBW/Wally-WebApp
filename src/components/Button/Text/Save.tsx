interface SaveProps {
    onClick: () => void;
}

export default function SaveButton(props: SaveProps) {
    return (
        <button onClick={() => props.onClick()}>Add</button>
    )
}