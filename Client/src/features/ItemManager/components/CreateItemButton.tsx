import PlusIcon from "@/component/Icon/Plus";
import clsx from "clsx";

interface CreateItemButtonProps {
    onCreate: () => void;
}

export default function CreateItemButton(props: CreateItemButtonProps) {
    return (
        <button 
            className={clsx(
                "w-full",
                "p-4 py-2 bg-white rounded-md",
                "border border-gray-300 hover:stroke-black hover:fill-blue-500 stroke-gray-400 fill-gray-400 hover:text-black",
                "hover:border hover:bg-gray-50",
                "fill-gray-300 stroke-gray-300",
                "shadow-sm flex items-center justify-center gap-2"
            )}
            onClick={props.onCreate}
        >
            <PlusIcon
                class="stroke-inherit fill-inherit size-4"
            />
        </button>
    )
}