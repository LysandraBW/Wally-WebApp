import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import useItemForm from "@/features/ItemManager/useItemForm";
import { useEffect } from "react";

export default function ServiceForm<DB_AppointmentService, Service, Services>(props: FormProps<DB_AppointmentService, Service, Services>) {
    const form = useItemForm(props);

    useEffect(() => {
        onReset();
    }, []);

    const onReset = () => {
        form.onReset(props.mutateItem, props.defineItem.test());
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Add Service" : `Edit Service #${(props.mutateItem as any).ServiceID}`}
            canDelete={props.mode !== "Create"}
            onReset={onReset}
            onCancel={props.onCancel}
            onDelete={props.onDelete}
            onMutate={form.onMutate}
            onExpand={props.onExpand}
            onMinimize={props.onMinimize}
            expanded={props.expanded}
            tab="Services"
        >
            <ItemFormGroup head="">
                <TextField
                    type="text"
                    name="Class"
                    label="Class"
                    value={form.form.getInput("Class").data}
                    state={form.form.getInput("Class").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Division"
                    label="Division"
                    value={form.form.getInput("Division").data}
                    state={form.form.getInput("Division").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Service"
                    label="Service"
                    value={form.form.getInput("Service").data}
                    state={form.form.getInput("Service").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemForm>
    )
}