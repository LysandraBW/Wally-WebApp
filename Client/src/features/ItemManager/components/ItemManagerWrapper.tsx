import { ReactNode } from "react";
import CloseButton from "@/component/Button/CloseButton";
import ResetButton from "@/features/ItemManager/components/ResetButton";
import DeleteButton from "@/features/ItemManager/components/DeleteButton";
import SaveCancelButtons from "@/features/ItemManager/components/SaveCancelButtons";
import { UseItemManagerProps } from "../useItemManager";

export interface ItemManagerProps<BaseThing, Thing, MappedThings> extends UseItemManagerProps<BaseThing, Thing, MappedThings> {
    header: string;
    canDelete: boolean;
}

export interface ItemManagerWrapperProps {
    header: string;
    children: ReactNode;
    canDelete: boolean;
    saveItem: () => void;
    resetItem: () => void;
    closeItem: () => void;
    deleteItem: () => void;
}

export function ItemManagerWrapper(props: ItemManagerWrapperProps) {
    return (
        <div className="grow flex flex-col justify-between bg-white min-w-[400px] w-full border border-gray-300 rounded-b-md">
            <div className="grow bg-white w-full">
                <div className="bg-white flex justify-between items-center p-4 gap-1 border-b border-b-gray-300">
                    <h6 className="font-medium">{props.header}</h6>
                    {
                        <CloseButton
                            onClose={props.closeItem}
                        />
                    }
                </div>
                {/* Action Bar */}
                <div className="flex items-center p-2 px-4 gap-2 border-b bg-gray-50 border-b-gray-300">
                    {/* Reset Button */}
                    <ResetButton
                        onReset={props.resetItem}
                    />
                    {/* Delete Button */}
                    {/*
                        This must be optional as we
                        can't delete items we're creating.
                        That wouldn't make sense (to me).
                    */}
                    {props.canDelete &&  
                        <DeleteButton
                            onDelete={props.deleteItem}
                        />
                    }
                </div>
                {/* Form */}
                {props.children}
            </div>
            {/* Save and Cancel Buttons */}
            <div className="p-2 border-t border-t-gray-300 relative after:bg-white after:absolute after:top-[-2px] after:left-0 after:w-full after:h-[1px]">
                <SaveCancelButtons
                    onCancel={props.closeItem}
                    onMutate={props.saveItem}
                />
            </div>
        </div>
    )
}