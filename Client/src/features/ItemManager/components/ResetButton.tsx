import IconButton from "@/component/Button/IconButton";
import ArrowPathIcon from "@/component/Icons/Icons/ArrowPathIcon";

interface ResetButtonProps {
    onReset: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
    return (
        <IconButton
            onClick={props.onReset}
        >
            <ArrowPathIcon
                className="size-3.5 stroke-inherit"
            />
        </IconButton>
    )
}