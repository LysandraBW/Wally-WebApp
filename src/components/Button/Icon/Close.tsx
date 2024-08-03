interface CloseButtonProps {
    onClose: () => void;
}

export default function CloseButton(props: CloseButtonProps) {
    return (
        <div onClick={() => props.onClose()}>
            x
        </div>
    )
}