import CloseButton from "@/component/Button/CloseButton";
import { ReactNode } from "react";
import DeleteButton from "./DeleteButton";
import ResetButton from "./ResetButton";
import SaveCancelButtons from "./SaveCancelButtons";
import clsx from "clsx";

interface ItemFormProps {
    header: string;
    children: ReactNode;
    canDelete: boolean;
    onReset: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onMutate: () => void;
}

export default function ItemForm(props: ItemFormProps) {
    return (
        <div 
            className={clsx(
                "bg-white shadow-lg",
                "h-fit min-w-[400px] max-w-[45%]"
            )}
        >
            {/* Header and Close Button */}
            <div 
                className={clsx(
                    "flex justify-between items-center",
                    "p-4 gap-1 border-b"
                )}
            >
                <h6 className="font-medium">{props.header}</h6>
                <div>
                    <CloseButton
                        close={props.onCancel}
                    />
                </div>
            </div>
            {/* Action Bar: Reset (Form), Delete */}
            <div 
                className={clsx(
                    "flex items-center p-1 gap-1",
                    "border-b bg-gray-50"
                )}
            >
                <ResetButton
                    onReset={props.onReset}
                />
                {/*
                This must be optional as we
                can't delete items we're creating.
                That wouldn't make sense (to me).
                */}
                {props.canDelete &&  
                    <DeleteButton
                        onDelete={props.onDelete}
                    />
                }
            </div>
            {/* 
            Form:
            A form will be stored in props.children.
            */}
            {props.children}
            {/* Save, Cancel Buttons */}
            <div className="p-4">
                <SaveCancelButtons
                    onCancel={props.onCancel}
                    onMutate={props.onMutate}
                />
            </div>
        </div>
    )
}