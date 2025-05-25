import CreateItemButton from "./Form/CreateItemButton";
import useItemManager, { UseItemManagerProps } from "./useItemManager";
import { UseItemFormProps } from "./useItemForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "./Form/SaveResetButtons";
import { JSX } from "react";

export interface DisplayProps<Items> {
    items: Items;
    onDelete: (ID: string) => void;
    onUpdate: (ID: string) => void;
}

export interface FormProps<BaseItem, Item, Items> extends UseItemFormProps<BaseItem, Item, Items> {
    onCancel: () => void;
    onDelete: () => void;
    onExpand: () => void;
    onMinimize: () => void;
    expanded: boolean;
}

export interface ItemManagerProps<BaseItem, Item, Items> extends UseItemManagerProps<BaseItem, Item, Items> {
    Form: (props: FormProps<BaseItem, Item, Items>) => JSX.Element;
    Display: (props: DisplayProps<Items>) => JSX.Element;
}

export default function ItemManager<BaseItem, Item, Items>(props: ItemManagerProps<BaseItem, Item, Items>) {
    const itemManager = useItemManager(props);

    return (
        <div>
            <div className="flex flex-col">
                <div className="p-2 border-b">
                    <CreateItemButton
                        onCreate={itemManager.onClickCreateItem}
                    />
                </div>
                <div className="px-2 py-2">
                    <props.Display
                        items={itemManager.newItems}
                        onUpdate={itemManager.onClickUpdateItem}
                        onDelete={itemManager.deleteItem}
                    />
                </div>
                {itemManager.createID &&
                    <Cover style="overflow-auto p-10 scroll-hide">
                        <props.Form
                            mode="Create"
                            defineItem={props.defineItem}
                            mutateItem={itemManager.toCreateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelCreate}
                            onMutate={itemManager.createItem}
                            onDelete={() =>  itemManager.deleteItem(itemManager.createID)}
                            onExpand={() => null}
                            onMinimize={() => null}
                            expanded={false}
                        />
                    </Cover>
                }
                {itemManager.updateID &&
                    <Cover style="overflow-auto p-10 scroll-hide">
                        <props.Form
                            mode="Update"
                            defineItem={props.defineItem}
                            mutateItem={itemManager.toUpdateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelUpdate}
                            onMutate={itemManager.updateItem}
                            onDelete={() => itemManager.deleteItem(itemManager.updateID)}
                            onExpand={() => null}
                            onMinimize={() => null}
                            expanded={false}
                        />
                    </Cover>
                }
            </div>
            <SaveResetButtons
                onSave={itemManager.saveUpdates}
                onReset={itemManager.resetUpdates}
            />
        </div>
    )
}