import Button from "@/component/Form/Button/Button";
import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import useItemForm from "@/features/ItemManager/useItemForm";
import { Fragment, useEffect } from "react";

export default function PartForm<DB_AppointmentPart, Part, Parts>(props: FormProps<DB_AppointmentPart, Part, Parts>) {
    const form = useItemForm(props);

    useEffect(() => {
        onReset();
    }, []);
    
    const onReset = () => {
        form.onReset(props.mutateItem, props.defineItem.test());
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Add Part" : `Edit Part #${(props.mutateItem as any).PartID}`}
            canDelete={props.mode !== "Create"}
            onReset={onReset}
            onCancel={props.onCancel}
            onDelete={props.onDelete}
            onMutate={form.onMutate}
            onExpand={props.onExpand}
            onMinimize={props.onMinimize}
            expanded={props.expanded}
            tab="Parts"
        >
            <ItemFormGroup head="Part">
                <TextField
                    type="text"
                    name="PartName"
                    label="Part Name"
                    value={form.form.getInput("PartName").data}
                    state={form.form.getInput("PartName").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="PartNumber"
                    label="Part Number"
                    value={form.form.getInput("PartNumber").data}
                    state={form.form.getInput("PartNumber").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            <ItemFormGroup head="Amount">
                <TextField
                    type="text"
                    name="Quantity"
                    label="Quantity"
                    value={form.form.getInput("Quantity").data}
                    state={form.form.getInput("Quantity").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="UnitCost"
                    label="Unit Cost"
                    value={form.form.getInput("UnitCost").data}
                    state={form.form.getInput("UnitCost").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemForm>
    )
}