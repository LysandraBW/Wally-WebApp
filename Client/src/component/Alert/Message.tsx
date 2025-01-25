import clsx from "clsx";
import CloseButton from "../Button/CloseButton";
import CrossIcon from "../Icon/Cross";

interface MessageProps {
    head: React.ReactNode;
    body: React.ReactNode;
    type: "Default" | "Error" | "Success" | "Warning";
    onClose: () => void;
}

export default function Message(props: MessageProps) {
    return (
        <div className="absolute left-0 top-4 w-[50%] translate-x-2/4 bg-white/50 rounded border border-gray-200 shadow-sm backdrop-blur">
            <div className="flex px-4 py-4 gap-4 items-start">
                <CloseButton
                    close={props.onClose}
                />
                <div className="relative top-[-3px]">
                    <h6 
                        className={clsx(
                            "text-05 font-medium text-gray-950",
                            props.type === "Success" && "text-green-500",
                            props.type === "Error" && "text-red-500"
                        )}
                    >
                        {props.head}
                    </h6>
                    <p className="text-03 text-gray-400">{props.body}</p>
                </div>
            </div>
        </div>
    )
}