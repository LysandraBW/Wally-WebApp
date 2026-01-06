import CloseButton from "../Button/CloseButton";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import clsx from "clsx";
import ExclamationCircleIcon from "../Icons/Icons/ExclamationCircleIcon";
import InformationCircleIcon from "../Icons/Icons/InformationCircleIcon";

interface ConfirmProps {
    head: React.ReactNode;
    body: React.ReactNode;
    yLabel: string;
    nLabel: string;
    onY: () => void;
    onN: () => void;
    onClose: () => void;
    absolute?: boolean;
    irreversible?: boolean;
}

export default function Confirm(props: ConfirmProps) {
    return (
        <div 
            className={clsx(
                "flex",
                props.absolute && "fixed z-[400] top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center"
            )}
        >
            <div 
                className={clsx(
                    "flex flex-col w-[700px]",
                    "bg-base-0 dark:bg-base-50 border border-base-300 dark:border-base-200 rounded-md shadow-sm",
                    // !props.absolute && ""
                )}
            >
                <div className="p-3 py-4 grid grid-cols-[min-content_auto_min-content] grid-rows-[min-content_auto] gap-x-2 gap-y-1 items-center">
                    {!props.irreversible &&
                        <InformationCircleIcon
                            className="size-4 stroke-base-900 col-start-1"
                        />
                    }
                    {props.irreversible &&
                        <ExclamationCircleIcon
                            className="size-4 stroke-red-500 col-start-1"
                        />
                    }
                    <h3 
                        className={clsx(
                            "alert-head col-start-2",
                            props.irreversible && "!text-red-500"
                        )}
                    >
                        {props.head}
                    </h3>
                    <CloseButton
                        size={10}
                        paddingLess={true}
                        onClick={props.onClose}
                    />
                    <p className="alert-body col-start-2">
                        {props.body}
                    </p>
                </div>
            <div className="flex justify-end gap-2 p-2 border-t border-base-300 dark:border-base-200 bg-base-50 dark:bg-[#121214] rounded-b-lg">
                    <SecondaryButton
                        className="text-xs"
                        onClick={props.onN}
                    >
                        {props.nLabel}
                    </SecondaryButton>
                    <PrimaryButton
                        className={clsx(
                            "text-xs",
                            props.irreversible && `
                                dark:shadow-red-700/30
                                bg-gradient-to-b from-red-500 to-red-600 border border-red-600
                                after:bg-gradient-to-b after:from-red-100 after:to-red-600
                                before:bg-gradient-to-b before:from-red-500 before:to-red-600
                                hover:before:!from-red-600 hover:before:!to-red-700 hover:border-red-700
                                dark:hover:before:!from-red-600 dark:hover:before:!to-red-700
                            `
                        )}
                        onClick={props.onY}
                    >
                        {props.yLabel}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}