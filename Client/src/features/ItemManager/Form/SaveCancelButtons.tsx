import Button from "@/component/Form/Button/Button";

interface SaveCancelButtonsProps {
    onCancel: () => void;
    onMutate: () => void;
}

export default function SaveCancelButtons(props: SaveCancelButtonsProps) {
    return (
        <div className="flex justify-end gap-4">
            <div className="min-w-[6rem]">
                <Button
                    style="boring small"
                    label="Cancel"
                    onClick={props.onCancel}
                />
            </div>
            <div className="min-w-[6rem]">
                <Button
                    style="boring boringBlack small"
                    label="Save"
                    onClick={props.onMutate}
                />
            </div>
        </div>
    )
}