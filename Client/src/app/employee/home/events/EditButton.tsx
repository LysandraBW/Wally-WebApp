import EditIcon from "@/component/Icons/Icons/PencilSquareIcon";
import clsx from "clsx";

export default function EditButton({onUpdate}: {onUpdate: () => void}) {
    return (
        <button 
            onClick={onUpdate}
            className={clsx(
                "flex justify-center items-center gap-1",
                "h-min w-min aspect-square",
                "bg-white hover:bg-gray-50",
                "rounded p-1 border border-gray-300 shadow-sm"
            )}
        >
            <EditIcon
                width="16"
                height="16"
                fill="#94A3B8"
                cursor="pointer"
            />
        </button>
    )
}