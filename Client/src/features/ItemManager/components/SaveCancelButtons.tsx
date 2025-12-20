import Button from "@/component/Form/Button/Button";

interface SaveCancelButtonsProps {
    onCancel: () => void;
    onMutate: () => void;
}

export default function SaveCancelButtons(props: SaveCancelButtonsProps) {
    return (
        <div className="flex justify-end gap-4">
            <div className="min-w-[6rem]">
                <button
                    onClick={props.onCancel}
                    className="w-full px-4 py-1.5 rounded-md bg-white border border-gray-300  shadow-sm text-03 tracking-wide font-medium text-gray-400"
                >
                    Cancel
                </button>
            </div>
            <div className="min-w-[6rem]">
                <button
                    onClick={props.onMutate}
                    className="w-full px-4 py-1.5 rounded-md bg-white border border-gray-300 shadow-sm text-03 tracking-wide font-medium text-black"
                >
                    Save
                </button>
            </div>
        </div>
    )
}