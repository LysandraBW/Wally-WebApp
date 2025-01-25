import PlusIcon from "@/component/Icon/Plus";
import clsx from "clsx";

interface CreateItemButtonProps {
    onCreate: () => void;
}

export default function CreateItemButton(props: CreateItemButtonProps) {
    return (
        <button 
            className={clsx(
                "aspect-square w-min h-min",
                "p-1 bg-white rounded-full",
                "border border-gray-200",
                "hover:border hover:bg-gray-50",
                "fill-gray-300 stroke-gray-300",
                "shadow-sm"
            )}
            onClick={props.onCreate}
        >
            <PlusIcon
                width="20"
                height="20"
                fill="inherit"
                stroke="inherit"
                strokeWidth="0.5"
                cursor="pointer"
            />
        </button>
    )
}