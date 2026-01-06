import clsx from "clsx";
import CloseButton from "../Button/CloseButton";
import InformationCircleIcon from "../Icons/Icons/InformationCircleIcon";
import ExclamationCircleIcon from "../Icons/Icons/ExclamationCircleIcon";
import CheckCircleIcon from "../Icons/Icons/CheckCircleIcon";

interface MessageProps {
    head: React.ReactNode;
    body?: React.ReactNode;
    type: "Default" | "Error" | "Success" | "Warning";
    onClose: () => void;
    absolute?: boolean;
    spanScreenWidth?: boolean;
}

export default function Message(props: MessageProps) {
    return (
        <div 
            className={clsx(
                "bg-white/25 dark:bg-black/25 rounded-md border border-base-300 dark:border-base-200 shadow-sm backdrop-blur",
                props.absolute && "absolute z-[10] top-[calc(1rem+4px)]",
                props.absolute && props.spanScreenWidth && "left-[2rem] w-[calc(100%-2rem-2rem)]",
                props.absolute && !props.spanScreenWidth && "[--width:min(700px,calc(100%-2rem-2rem))] left-[calc(50%-var(--width)/2)] w-[calc(var(--width))]",
            )}
        >
            <div className="p-3 grid grid-cols-[min-content_auto_min-content] grid-rows-[min-content_min-content] gap-x-2 gap-y-0 items-center">
                {props.type === "Default" &&
                    <InformationCircleIcon
                        className="size-4 stroke-base-900 col-start-1"
                    />
                }
                {props.type === "Error" &&
                    <ExclamationCircleIcon
                        className="size-4 stroke-red-500 col-start-1"
                    />
                }
                {props.type === "Success" &&
                    <CheckCircleIcon
                        className="size-4 stroke-green-500 col-start-1"
                    />
                }
                <h3 
                    className={clsx(
                        "alert-head col-start-2",
                        props.type === "Error" && "!text-red-500",
                        props.type === "Success" && "!text-green-500"
                    )}
                >
                    {props.head}
                </h3>
                <CloseButton
                    size={10}
                    paddingLess={true}
                    onClick={props.onClose}
                />
                {props.body &&
                    <p className="alert-body col-start-2">
                        {props.body}
                    </p>
                }
            </div>
        </div>
    )
}