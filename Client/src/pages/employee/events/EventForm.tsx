import { Fragment, useEffect, useState } from "react";
import Button from "@/component/Form/Button/Button";
import { getCookie } from "@/utils/cookies/getCookie";
import GetEmployeeNamePairs from "@/services/DB/Procedure/Employee/GetEmployeeNamePairs";
import useItemForm from "@/features/ItemManager/useItemForm";
import { FormProps } from "@/features/ItemManager/ItemManager";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/TextField";
import MultipleSelect from "@/component/Form/Select/Select/MultipleSelect";
import ItemForm from "@/features/ItemManager/Form/ItemForm";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";

export default function EventForm<DB_Event, Event, Events>(props: FormProps<DB_Event, Event, Events>) {
    const form = useItemForm(props);
    const [isCreator, setIsCreator] = useState(false);
    const [employees, setEmployees] = useState<Options>([]);

    useEffect(() => {
        const load = async () => {
            const sessionID = await getCookie("sessionID");
            const employees = await GetEmployeeNamePairs(sessionID);
            setEmployees(employees);
            onReset();
        }
        load();
    }, []);

    useEffect(() => {
        onReset();
    }, [employees]);

    const onReset = async () => {
        const event = props.mutateItem as any;
        const isCreator = !event.Sharees.includes(event.EventID) || !event.EventID;;
        setIsCreator(isCreator);
        form.onReset(props.mutateItem, props.defineItem.test(getValues(employees)));
    }

    return (
        <ItemForm
            header="Event"
            canDelete={true}
            onReset={onReset}
            onCancel={props.onCancel}
            onDelete={props.onDelete}
            onMutate={form.onMutate}
        >
            <ItemFormGroup head="Event">
                <TextField
                    type="text"
                    name="Name"
                    label="Name"
                    value={form.form.getInput("Name").data}
                    state={form.form.getInput("Name").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Summary"
                    label="Summary"
                    value={form.form.getInput("Summary").data}
                    state={form.form.getInput("Summary").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="datetime-local"
                    name="Date"
                    label="Date"
                    value={form.form.getInput("Date").data}
                    state={form.form.getInput("Date").state}
                    onChange={form.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            {isCreator &&
                <ItemFormGroup head="Control Access">
                    <MultipleSelect
                        name="Sharees"
                        label="Select Sharees"
                        toggleLabel="Select Sharees"
                        values={form.form.getInput("Sharees").data}
                        state={form.form.getInput("Sharees").state}
                        options={employees}
                        onChange={form.updateInputValue}
                        disabled={false}
                    />
                </ItemFormGroup>
            }
        </ItemForm>
    )
}