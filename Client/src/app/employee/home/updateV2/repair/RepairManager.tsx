import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import useItemManager from "../useItemManager";
import { ItemManagerProps, ItemManagerWrapper } from "../ItemManagerWrapper";

export default function RepairManager<DB_AppointmentRepair, Repair, Repairs>(props: ItemManagerProps<DB_AppointmentRepair, Repair, Repairs>) {
    const itemManager = useItemManager(props);

    return (
        <ItemManagerWrapper
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
                    value={itemManager.itemForm.getInput("Repair").data}
                    state={itemManager.itemForm.getInput("Repair").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemManagerWrapper>
    )
}