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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="stroke-inherit fill-inherit size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {/* <label className="tracking-wide font-medium text-inherit">Add {props.itemName}</label> */}
        </button>
        // <button 
        //     className={clsx(
        //         "aspect-square w-min h-min",
        //         "p-1 bg-white rounded-full",
        //         "border border-gray-200",
        //         "hover:border hover:bg-gray-50",
        //         "fill-gray-300 stroke-gray-300",
        //         "shadow-sm"
        //     )}
        //     onClick={props.onCreate}
        // >
        //     <PlusIcon
        //         width="20"
        //         height="20"
        //         fill="inherit"
        //         stroke="inherit"
        //         strokeWidth="0.5"
        //         cursor="pointer"
        //     />
        // </button>
    )
}