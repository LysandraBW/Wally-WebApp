import Close from "@/components/Icon/Close/Close";

interface CloseButtonProps {
    onClick: () => void;
}

export default function CloseButton(props: CloseButtonProps) {
    return (
        <div onClick={() => props.onClick()}>
                <Close
                    width='20'
                    height='20'
                    color='#000'
                />
        </div>
    )
}