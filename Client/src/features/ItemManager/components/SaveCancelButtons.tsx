import PrimaryButton from "@/component/Button/PrimaryButton";
import SecondaryButton from "@/component/Button/SecondaryButton";

interface SaveCancelButtonsProps {
    onCancel: () => void;
    onMutate: () => void;
}

export default function SaveCancelButtons(props: SaveCancelButtonsProps) {
    return (
        <div className="h-min flex justify-end gap-2">
            <div className="min-w-[6rem]">
                <SecondaryButton
                    onClick={props.onCancel}
                    className="text-xs w-full h-full"
                >
                    Cancel
                </SecondaryButton>
            </div>
            <div className="min-w-[6rem]">
                <PrimaryButton
                    onClick={props.onMutate}
                    className="text-xs w-full h-full"
                >
                    Save
                </PrimaryButton>
            </div>
        </div>
    )
}