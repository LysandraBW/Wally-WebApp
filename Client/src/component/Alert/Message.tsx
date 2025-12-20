import clsx from "clsx";
import CloseButton from "../Button/CloseButton";
import CrossIcon from "../Icon/Icons/XMarkIcon";

interface MessageProps {
    head: React.ReactNode;
    body: React.ReactNode;
    type: "Default" | "Error" | "Success" | "Warning";
    onClose: () => void;
}

export default function Message(props: MessageProps) {
    return (
        <div className="absolute left-0 top-2 w-[calc(100vw-256px-2rem-2rem)] left-[calc(256px+2rem)] bg-white/50 rounded border border-gray-300 shadow-sm backdrop-blur">
            <div className="flex px-2 py-2 gap-2 items-start">
                <CloseButton
                    close={props.onClose}
                />
                <div className="relative top-[-3px] flex flex-col gap-0">
                    <h6 
                        className={clsx(
                            "text-base tracking-wide font-medium text-gray-950",
                            props.type === "Success" && "text-green-500",
                            props.type === "Error" && "text-red-500"
                        )}
                    >
                        {props.head}
                    </h6>
                    {props.body &&
                        <p className="text-sm text-gray-400 tracking-wide">{props.body}</p>
                    }
                </div>
            </div>
        </div>
    )
}