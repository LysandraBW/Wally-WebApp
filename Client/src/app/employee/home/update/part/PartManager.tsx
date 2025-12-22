import TextField from "@/component/Form/Text/Text";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import { ItemManagerProps, ItemManagerWrapper } from "@/features/ItemManager/components/ItemManagerWrapper";
import useItemManager from "@/features/ItemManager/useItemManager";

export default function PartManager<DB_AppointmentPart, Part, Parts>(props: ItemManagerProps<DB_AppointmentPart, Part, Parts>) {
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
            <ItemFormGroup head="Part">
                <TextField
                    type="text"
                    name="PartName"
                    label="Part Name"
                    value={itemManager.itemForm.getInput("PartName").data}
                    state={itemManager.itemForm.getInput("PartName").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="PartNumber"
                    label="Part Number"
                    value={itemManager.itemForm.getInput("PartNumber").data}
                    state={itemManager.itemForm.getInput("PartNumber").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            <ItemFormGroup head="Amount">
                <TextField
                    type="text"
                    name="Quantity"
                    label="Quantity"
                    value={itemManager.itemForm.getInput("Quantity").data}
                    state={itemManager.itemForm.getInput("Quantity").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="UnitCost"
                    label="Unit Cost"
                    value={itemManager.itemForm.getInput("UnitCost").data}
                    state={itemManager.itemForm.getInput("UnitCost").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemManagerWrapper>
    )
}