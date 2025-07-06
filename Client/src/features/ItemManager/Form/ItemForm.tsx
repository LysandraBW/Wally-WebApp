import CloseButton from "@/component/Button/CloseButton";
import { ReactNode, useContext } from "react";
import DeleteButton from "./DeleteButton";
import ResetButton from "./ResetButton";
import SaveCancelButtons from "./SaveCancelButtons";
import clsx from "clsx";
import ExpandButton from "./ExpandButton";
import MinimizeButton from "./Minimize";
import { UpdateManagerContext } from "@/pages/employee/edit/Update";

interface ItemFormProps {
    header: string;
    children: ReactNode;
    expanded: boolean;
    canDelete: boolean;
    onReset: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onMutate: () => void;
    onExpand: () => void;
    onMinimize: () => void;
    tab: string;
}

export default function ItemForm(props: ItemFormProps) {
    const updateManagerContext = useContext(UpdateManagerContext);

    return (
        <div
            className={clsx(
                "grow flex flex-col justify-between bg-white",
                "min-w-[400px] w-full border border-gray-300 rounded-tr-md rounded-b-md"
            )}
        >
            <div 
                className={clsx(
                    "grow bg-white",
                    "w-full rounded-tr-md"
                )}
            >
                {/* Header and Close Button */}
                <div 
                    className={clsx(
                        "bg-white flex justify-between items-center",
                        "p-4 gap-1 border-b border-b-gray-300 rounded-tr-md"
                    )}
                >
                    <h6 className="font-medium">{props.header}</h6>
                    {!props.expanded &&
                        <div>
                            <CloseButton
                                close={props.onCancel}
                            />
                        </div>
                    }
                </div>
                {/* Action Bar: Reset (Form), Delete, Expand */}
                <div 
                    className={clsx(
                        "flex items-center p-2 px-4 gap-2",
                        "border-b bg-gray-50 border-b-gray-300"
                    )}
                >
                    <ResetButton
                        onReset={props.onReset}
                    />
                    {!props.expanded &&
                        <ExpandButton
                            onExpand={props.onExpand}
                        />
                    }
                    {props.expanded &&
                        <MinimizeButton
                            onMinimize={props.onMinimize}
                        />
                    }
                    {/*
                    This must be optional as we
                    can't delete items we're creating.
                    That wouldn't make sense (to me).
                    */}
                    {props.canDelete &&  
                        <DeleteButton
                            onDelete={() => {
                                props.onDelete();
                                updateManagerContext.setChangesMade(props.tab, true);
                            }}
                        />
                    }
                </div>
                {/* 
                Form:
                A form will be stored in props.children.
                */}
                {props.children}
            </div>
            {/* Save, Cancel Buttons */}
            <div className="p-2 border-t border-t-gray-300 relative after:bg-white after:absolute after:top-[-2px] after:left-0 after:w-full after:h-[1px]">
                <SaveCancelButtons
                    onCancel={props.onCancel}
                    onMutate={() => {
                        props.onMutate();
                        updateManagerContext.setChangesMade(props.tab, true);
                    }}
                />
            </div>
        </div>
    )
}