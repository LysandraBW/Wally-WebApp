import TextField from "@/component/Form/Text/Text";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import useItemManager from "../../../../../features/ItemManager/useItemManager";
import { ItemManagerProps, ItemManagerWrapper } from "@/features/ItemManager/components/ItemManagerWrapper";
import { Service, Services } from "./_DEF";
import { Service as DB_AppointmentService } from "waltronics-types";

export default function ServiceManager(props: ItemManagerProps<DB_AppointmentService, Service, Services>) {
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