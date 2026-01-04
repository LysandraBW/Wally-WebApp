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
        <div className="grow grid grid-cols-1 grid-rows-[1fr_auto] justify-between bg-white  w-full border border-t-0 border-gray-300">
            <div className="grow bg-white w-full">
                <div className="bg-white flex justify-start items-center px-2 py-4 border-b border-b-gray-300">
                    <h6 className="font-medium text-sm tracking-wide text-base-700">
                        {props.header}
                    </h6>
                </div>
                {/* Action Bar */}
                <div className="flex items-center p-2 px-2 gap-2 border-b bg-gray-50 border-b-gray-300">
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
            <div className="h-min p-2 border-t border-t-gray-300 relative">
                <SaveCancelButtons
                    onCancel={props.closeItem}
                    onMutate={props.saveItem}
                />
            </div>
        </div>
    )
}