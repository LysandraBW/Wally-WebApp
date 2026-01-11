import TextField from "@/component/Form/Text/Text";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import { ItemManagerProps, ItemForm } from "@/features/ItemManager/components/ItemForm";
import useItemManager from "@/features/ItemManager/useItemManager";

export default function DiagnosisManager<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>(props: ItemManagerProps<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>) {
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
                    name="Code"
                    label="Code"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Code").data}
                    state={itemManager.itemForm.getInput("Code").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Message"
                    label="Message"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Message").data}
                    state={itemManager.itemForm.getInput("Message").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemForm>
    )
}