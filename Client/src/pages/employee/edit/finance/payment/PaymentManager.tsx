import PaymentDisplay from "./PaymentDisplay";
import PaymentForm from "./PaymentForm";
import { DefinePayment, Payments, PaymentUpdates } from "./_DEF";
import { DB_AppointmentPayment } from "@/services/DB/Interface/Appointment";
import buildUpdate from "@/features/ItemManager/buildUpdate";
import useItemManager from "@/features/ItemManager/useItemManager";
import CreateItemButton from "@/features/ItemManager/Form/CreateItemButton";
import { UseForm } from "@/features/Form/useForm/useForm";
import Cover from "@/views/Absolute/Cover";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";

interface PaymentManagerProps {
    parentForm: UseForm;
    paymentList: Array<DB_AppointmentPayment>;
    onSaveUpdates: (updates: PaymentUpdates) => void;
}

export default function PaymentManager(props: PaymentManagerProps) {
    const definePayment = new DefinePayment();

    const processUpdates = (oldItems: Payments, newItems: Payments) => {
        const itemID = "PaymentID";
        const updateKeys = ["Payment"];
        const insertKeys = ["Payment", "Name", "Type", "CCN", "EXP"];
        const updates = buildUpdate(oldItems, newItems, itemID, updateKeys, insertKeys, itemID);
        props.onSaveUpdates(updates);
    }

    const itemManager = useItemManager({
        itemList: props.paymentList,
        defineItem: definePayment,
        parentForm: props.parentForm,
        saveAllUpdates: processUpdates
    })

    return (
        <div>
            <div className="gap-4">
                <div className="p-2 border-b">
                    <CreateItemButton
                        onCreate={itemManager.onClickCreateItem}
                    />
                </div>
                <div className="px-2 py-2">
                    <PaymentDisplay
                        items={itemManager.newItems}
                        onUpdate={itemManager.onClickUpdateItem}
                        onDelete={itemManager.deleteItem}
                    />
                </div>
                {itemManager.createID &&
                    <Cover style="overflow-auto p-10 scroll-hide">
                        <PaymentForm
                            mode="Create"
                            defineItem={definePayment}
                            mutateItem={itemManager.toCreateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelCreate}
                            onMutate={itemManager.createItem}
                            onDelete={() => {
                                itemManager.deleteItem(itemManager.createID);
                            }}
                        />
                    </Cover>
                }
                {itemManager.updateID &&
                    <Cover style="overflow-auto p-10 scroll-hide">
                        <PaymentForm
                            mode="Create"
                            defineItem={definePayment}
                            mutateItem={itemManager.toUpdateItem}
                            parentForm={itemManager.form}
                            onCancel={itemManager.cancelUpdate}
                            onMutate={itemManager.updateItem}
                            onDelete={() => {
                                itemManager.deleteItem(itemManager.updateID);
                            }}
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