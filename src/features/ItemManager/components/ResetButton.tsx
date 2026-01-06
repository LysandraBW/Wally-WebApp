import IconButton from "@/component/Button/IconButton";
import ArrowPathIcon from "@/component/Icons/Icons/ArrowPathIcon";

interface ResetButtonProps {
    onReset: () => void;
}

export default function ResetButton(props: ResetButtonProps) {
    return (
        <IconButton
            size={14}
            onClick={props.onReset}
            className="rounded-[5px] shadow-xs dark:shadow-md"
        >
            <ArrowPathIcon
                className="size-3.5 stroke-inherit"
            />
        </IconButton>
    )
}