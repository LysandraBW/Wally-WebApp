import TransparentCover from "@/views/Absolute/TransparentCover";
import CloseButton from "../Button/CloseButton";
import Button from "../Form/Button/Button";

interface ConfirmProps {
    head: React.ReactNode;
    body: React.ReactNode;
    yLabel: string;
    nLabel: string;
    onY: () => void;
    onN: () => void;
    onClose: () => void;
}

export default function Confirm(props: ConfirmProps) {
    return (
        <TransparentCover style="items-center">
            <div className="flex flex-col gap-4 rounded border border-gray-200 shadow-sm p-4 bg-white">
                <div className="flex justify-end">
                    <CloseButton
                        close={props.onClose}
                    />
                </div>
                <div>
                    <h6 className="font-medium text-06">{props.head}</h6>
                    <p>{props.body}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <div className="flex gap-4">
                        <Button
                            style="boring small !w-min !px-4"
                            label={props.nLabel}
                            onClick={props.onN}
                        />
                        <Button
                            style="darkBoring small !w-min !px-4"
                            label={props.yLabel}
                            onClick={props.onY}
                        />
                    </div>
                </div>
            </div>
        </TransparentCover>
    )
}