import TextField from "@/component/Form/Text/Text";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import { ItemManagerProps, ItemForm } from "@/features/ItemManager/components/ItemForm";
import useItemManager from "@/features/ItemManager/useItemManager";

export default function RepairManager<DB_AppointmentRepair, Repair, Repairs>(props: ItemManagerProps<DB_AppointmentRepair, Repair, Repairs>) {
    const itemManager = useItemManager(props);

    return (
        <ItemForm
            header={props.header}
            canDelete={props.canDelete}
            saveItem={itemManager.saveItem}
            closeItem={itemManager.closeItem}
            resetItem={itemManager.resetItem}
            deleteItem={itemManager.deleteItem}
        >
            <ItemFormGroup head="">
                <TextField
                    type="text"
                    name="Repair"
                    label="Repair"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Repair").data}
                    state={itemManager.itemForm.getInput("Repair").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemForm>
    )
}