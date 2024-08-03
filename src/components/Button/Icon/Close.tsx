interface CloseButtonProps {
    onClick: () => void;
}

export default function CloseButton(props: CloseButtonProps) {
    return (
        <div onClick={() => props.onClick()}>
            x
        </div>
    )
}