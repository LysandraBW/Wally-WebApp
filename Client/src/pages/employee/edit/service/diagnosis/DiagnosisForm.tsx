import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import useItemForm from "@/features/ItemManager/useItemForm";
import { useEffect } from "react";

export default function DiagnosisForm<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>(props: FormProps<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>) {
    const form = useItemForm(props);

    useEffect(() => {
        onReset();
    }, []);

    const onReset = () => {
        form.onReset(props.mutateItem, props.defineItem.test());
    }

    return (
        <ItemForm
            header={props.mode === "Create" ? "Create Diagnosis" : `Edit Diagnosis #${(props.mutateItem as any).DiagnosisID}`}
            canDelete={true}
            onReset={onReset}
            onDelete={props.onDelete}
            onCancel={props.onCancel}
            onMutate={form.onMutate}
        >
            <ItemFormGroup head="">
                <TextField
                    type="text"
                    name="Code"
                    label="Code"
                    value={form.form.getInput("Code").data}
                    state={form.form.getInput("Code").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Message"
                    label="Message"
                    value={form.form.getInput("Message").data}
                    state={form.form.getInput("Message").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ItemForm>
    )
}