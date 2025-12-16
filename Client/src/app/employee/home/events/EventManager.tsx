import { Fragment, useEffect, useState } from "react";
import Button from "@/component/Form/Button/Button";
import { getCookie } from "@/utils/cookies/getCookie";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/TextField";
import MultipleSelect from "@/component/Form/Select/Select/MultipleSelect";
import ItemForm from "@/features/ItemManager/components/ItemForm";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import useItemManager from "../../../../features/ItemManager/useItemManager";
import { Event as DB_Event } from "waltronics-types";
import { Event, Events } from "./_DEF";
import { ItemManagerProps, ItemManagerWrapper } from "@/features/ItemManager/components/ItemManagerWrapper";

export default function EventManager(props: ItemManagerProps<DB_Event, Event, Events>) {
    const itemManager = useItemManager(props as any);
    const [isCreator, setIsCreator] = useState(false);
    const [employees, setEmployees] = useState<Options>([]);

    useEffect(() => {
        const load = async () => {
            const employees = await GetEmployeeNamePairs();
            setEmployees(employees);
        }
        load();
    }, []);

    
    useEffect(() => {
        if (!employees)
            return;

        if (!props.itemsManager.forms || !(props.itemID in props.itemsManager.forms)) 
            return;

        const event = props.itemsManager.forms[props.itemID] as Event;
        const isCreator = !event.Sharees.includes(event.EventID) || !event.EventID;
        setIsCreator(isCreator);

        const test = props.itemsManager.item.test(getValues(employees));
        itemManager.itemForm.setTest(test);

    }, [employees]);


    return (
        <ItemManagerWrapper
            header={props.header}
            canDelete={props.canDelete}
            saveItem={itemManager.saveItem}
            closeItem={itemManager.closeItem}
            resetItem={itemManager.resetItem}
            deleteItem={itemManager.deleteItem}
        >
            <ItemFormGroup head="Event">
                <TextField
                    type="text"
                    name="Name"
                    label="Name"
                    value={itemManager.itemForm.getInput("Name").data}
                    state={itemManager.itemForm.getInput("Name").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Summary"
                    label="Summary"
                    value={itemManager.itemForm.getInput("Summary").data}
                    state={itemManager.itemForm.getInput("Summary").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="datetime-local"
                    name="Date"
                    label="Date"
                    value={itemManager.itemForm.getInput("Date").data}
                    state={itemManager.itemForm.getInput("Date").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            {isCreator &&
                <ItemFormGroup head="Control Access">
                    <MultipleSelect
                        name="Sharees"
                        label="Select Sharees"
                        toggleLabel="Select Sharees"
                        values={itemManager.itemForm.getInput("Sharees").data}
                        state={itemManager.itemForm.getInput("Sharees").state}
                        options={employees}
                        onChange={itemManager.updateInputValue}
                        disabled={false}
                    />
                </ItemFormGroup>
            }
        </ItemManagerWrapper>
    )
}