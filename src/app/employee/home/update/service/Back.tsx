import IconButton from "@/component/Button/IconButton";
import ArrowLongLeftIcon from "@/component/Icons/Icons/ArrowLongLeftIcon";

export default function Back(props: {onClick: () => void}) {
    return (
         <div className="bg-base-0 dark:bg-base-50 p-1">
            <IconButton
                size={10}
                className="!shadow-none rounded-[4px]"
                onClick={props.onClick}
            >
                <ArrowLongLeftIcon
                    className="size-3 stroke-base-500 dark:stroke-base-400 stroke-[2px]"
                />
            </IconButton>
        </div>
    )
}