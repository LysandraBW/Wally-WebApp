
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
        <div>
            <div className="flex flex-col gap-4 rounded-md border border-gray-300 shadow-sm p-4 bg-white">
                <div className="flex justify-end">
                    <CloseButton
                        close={props.onClose}
                    />
                </div>
                <div>
                    <h6 className="font-medium text-06">{props.head}</h6>
                    <p className="tracking-wide max-w-[440px] text-04">{props.body}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <div className="flex gap-2">
                        <button onClick={props.onN} className="px-4 w-min rounded-md py-2 border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-black">{props.nLabel}</button>
                        <button onClick={props.onY} className="px-4 w-min rounded-md py-2 border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-black">{props.yLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}