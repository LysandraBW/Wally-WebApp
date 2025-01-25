import Button from "@/component/Form/Button/Button";
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
                "border-t border-t-gray-200",
                "flex gap-4 justify-end",
                "bg-white w-full p-4"
            )}
        >
            <div className="w-min min-w-[10rem]">
                <Button
                    style="boring small"
                    label="Reset Changes"
                    onClick={props.onReset}
                />
            </div>
            <div className="w-min min-w-[10rem]">
                <Button
                    style="boring boringBlack small"
                    label="Save Changes"
                    onClick={props.onSave}
                />
            </div>
        </div>
    )
}