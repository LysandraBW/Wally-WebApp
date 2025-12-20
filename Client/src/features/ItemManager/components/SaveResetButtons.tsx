import Button from "@/component/Form/Button/Button";
import ButtonTwo from "@/component/Form/Button/Button2";
import clsx from "clsx";

interface SaveResetButtonsProps {
    onSave: () => void;
    onReset: () => void;
    changesMade?: boolean;
}

// This is used differently than
// SaveCancelButtons. SaveCancelButtons
// is used inside of a form for a single Item.
// SaveResetButtons is used for the entire,
// form across all Items.
export default function SaveResetButtons(props: SaveResetButtonsProps) {
    return (
        <div 
            className={clsx(
                "sticky bottom-0 z-30",
                "flex gap-4 justify-end border-t border-t-gray-300",
                "bg-gray-50 w-full p-2 rounded-b-md",
            )}
        >
            {/* <div className="w-min"> */}
                <button onClick={props.onReset} className={clsx("whitespace-nowrap w-min bg-white px-4 py-1.5 border border-gray-300 shadow-sm rounded-md tracking-wide text-03 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-700", (props.changesMade !== undefined && !props.changesMade) && "!text-gray-400 !hover:bg-gray-50 !bg-gray-50 cursor-default")}>Reset Changes</button>
            {/* </div> */}
            {/* <div className="w-min"> */}
                <button onClick={props.onSave} className={clsx("whitespace-nowrap w-min bg-white px-4 py-1.5 border border-gray-300 shadow-sm rounded-md tracking-wide text-03 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-700", (props.changesMade !== undefined && !props.changesMade) && "!text-gray-400  !hover:bg-gray-50 !bg-gray-50 cursor-default")}>Save Changes</button>
            {/* </div> */}
        </div>
    )
}