import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import useItemManager from "../useItemManager";
import { ItemManagerProps, ItemManagerWrapper } from "../ItemManagerWrapper";

export default function ServiceManager<DB_AppointmentService, Service, Services>(props: ItemManagerProps<DB_AppointmentService, Service, Services>) {
    const itemManager = useItemManager(props as any);

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
                    name="Class"
                    label="Class"
                    value={itemManager.itemForm.getInput("Class").data}
                    state={itemManager.itemForm.getInput("Class").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Division"
                    label="Division"
                    value={itemManager.itemForm.getInput("Division").data}
                    state={itemManager.itemForm.getInput("Division").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Service"
                    label="Service"
                    value={itemManager.itemForm.getInput("Service").data}
                    state={itemManager.itemForm.getInput("Service").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemManagerWrapper>
    )
}