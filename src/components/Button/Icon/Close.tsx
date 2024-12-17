import CloseIcon from "@/components/Icon/close/Close";

interface CloseProps {
    onClick: () => void;
}

export default function Close(props: CloseProps) {
    return (
        <div onClick={() => props.onClick()}>
                <CloseIcon
                    width='20'
                    height='20'
                    color='#757890'
                />
        </div>
    )
}