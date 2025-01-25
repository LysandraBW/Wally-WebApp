import clsx from "clsx";
import CrossIcon from "../Icon/Cross";

interface CloseButtonProps {
    close: () => void;
}

export default function CloseButton(props: CloseButtonProps) {
    return (
        <button 
            onClick={props.close}
            className={"icon !rounded-full"}
        >
            <CrossIcon
                width={"12"}
                height={"12"}
                strokeWidth="1"
                cursor="pointer"
            />
        </button>
    )
}