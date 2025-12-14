import { ReactNode } from "react";
import { UseThingManagerProps } from "./useThingManager";
import CloseButton from "@/component/Button/CloseButton";
import ResetButton from "@/features/ItemManager/Form/ResetButton";
import DeleteButton from "@/features/ItemManager/Form/DeleteButton";
import SaveCancelButtons from "@/features/ItemManager/Form/SaveCancelButtons";

export interface ThingManagerProps<BaseThing, Thing, MappedThings> extends UseThingManagerProps<BaseThing, Thing, MappedThings>, Omit<ThingManagerWrapperProps, "children" | "saveThing" | "resetThing" | "cancelThing" | "deleteThing" | "closeThing" | "cancel"> {}

export interface ThingManagerWrapperProps {
    header: string;
    children: ReactNode;
    canDelete: boolean;
    saveThing: () => void;
    deleteThing: () => void;
    resetThing: () => void;
    closeThing: () => void;
    cancelThing: () => void;
}

export function ThingManagerWrapper(props: ThingManagerWrapperProps) {
    return (
        <div className="grow flex flex-col justify-between bg-white min-w-[400px] w-full border border-gray-300 rounded-tr-md rounded-b-md">
            <div className="grow bg-white w-full rounded-tr-md">
                <div className="bg-white flex justify-between items-center p-4 gap-1 border-b border-b-gray-300 rounded-tr-md">
                    <h6 className="font-medium">{props.header}</h6>
                    {
                        <CloseButton
                            close={props.cancelThing}
                        />
                    }
                </div>
                {/* Action Bar */}
                <div className="flex items-center p-2 px-4 gap-2 border-b bg-gray-50 border-b-gray-300">
                    {/* Reset Button */}
                    <ResetButton
                        onReset={props.resetThing}
                    />
                    {/* Delete Button */}
                    {/*
                        This must be optional as we
                        can't delete items we're creating.
                        That wouldn't make sense (to me).
                    */}
                    {props.canDelete &&  
                        <DeleteButton
                            onDelete={props.deleteThing}
                        />
                    }
                </div>
                {/* Form */}
                {props.children}
            </div>
            {/* Save and Cancel Buttons */}
            <div className="p-2 border-t border-t-gray-300 relative after:bg-white after:absolute after:top-[-2px] after:left-0 after:w-full after:h-[1px]">
                <SaveCancelButtons
                    onCancel={props.cancelThing}
                    onMutate={props.saveThing}
                />
            </div>
        </div>
    )
}