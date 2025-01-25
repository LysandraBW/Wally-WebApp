import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import useItemForm from "@/features/ItemManager/useItemForm";
import { useEffect } from "react";

export default function RepairForm<DB_AppointmentRepair, Repair, Repairs>(props: FormProps<DB_AppointmentRepair, Repair, Repairs>) {
    const form = useItemForm(props);

    useEffect(() => {
        onReset();
    }, []);

    const onReset = () => {
        form.onReset(props.mutateItem, props.defineItem.test());
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Create Repair" : `Edit Repair #${(props.mutateItem as any).RepairID}`}
            canDelete={true}
            onReset={onReset}
            onDelete={props.onDelete}
            onCancel={props.onCancel}
            onMutate={form.onMutate}
        >
            <ItemFormGroup head="">
                <TextField
                    type="text"
                    name="Repair"
                    label="Repair"
                    value={form.form.getInput("Repair").data}
                    state={form.form.getInput("Repair").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemForm>
    )
}