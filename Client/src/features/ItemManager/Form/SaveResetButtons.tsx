import Button from "@/component/Form/Button/Button";
import ButtonTwo from "@/component/Form/Button/ButtonTwo";
import clsx from "clsx";

interface SaveResetButtonsProps {
    onSave: () => void;
    onReset: () => void;
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
                "flex gap-4 justify-end border-r border-r-gray-300 border-b border-b-gray-300 border-l border-l-gray-300",
                "bg-gray-50 w-full p-2 rounded-b-md",
            )}
        >
            <div className="w-min min-w-[10rem]">
                <button onClick={props.onReset} className="w-full bg-white px-4 py-2 border border-gray-300 shadow-sm rounded-md tracking-wide font-medium text-black">Reset Changes</button>
            </div>
            <div className="w-min min-w-[10rem]">
                <button onClick={props.onSave} className="w-full bg-white px-4 py-2 border border-gray-300 shadow-sm rounded-md tracking-wide font-medium text-black">Save Changes</button>
            </div>
        </div>
    )
}