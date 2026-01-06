import PrimaryButton from "@/component/Button/PrimaryButton";
import SecondaryButton from "@/component/Button/SecondaryButton";
import clsx from "clsx";

interface SaveResetButtonsProps {
    onSave: () => void;
    onReset: () => void;
    changesMade?: boolean;
}

// This is used differently than SaveCancelButtons.
// SaveCancelButtons is used inside of a form for
// a single Item. SaveResetButtons is used for the entire,
// form across all Items.
export default function SaveResetButtons(props: SaveResetButtonsProps) {
    return (
        <div 
            className={clsx(
                "w-full p-2",
                "relative z-0",
                "flex gap-2 justify-end",
                "bg-base-50 border-t border-base-300 dark:border-base-200 rounded-b-md",
            )}
        >
            <SecondaryButton
                disabled={!props.changesMade}
                className="text-xs tracking-wide px-4"
                onClick={props.onReset}
            >
                Reset Changes
            </SecondaryButton>
            <PrimaryButton
                disabled={!props.changesMade}
                className="text-xs tracking-wide px-4"
                onClick={props.onSave}
            >
                Save Changes
            </PrimaryButton>
        </div>
    )
}