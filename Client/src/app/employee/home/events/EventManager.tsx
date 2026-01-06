import { Fragment, useEffect, useState } from "react";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/Text";
import ItemFormGroup from "@/features/ItemManager/components/ItemFormGroup";
import GetEmployeeNamePairs from "@/services/DB/Employee/GetEmployeeNamePairs";
import useItemManager from "../../../../features/ItemManager/useItemManager";
import { Event as DB_Event } from "waltronics-types";
import { Event, Events } from "./_DEF";
import { ItemManagerProps, ItemManagerWrapper } from "@/features/ItemManager/components/ItemManagerWrapper";
import Select from "@/component/Form/Select/Select";

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

        if (!props.itemsManager.tempItems || !(props.itemID in props.itemsManager.tempItems)) 
            return;

        const event = props.itemsManager.tempItems[props.itemID] as Event;
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
            noBorderL={true}
        >
            <ItemFormGroup head="Event">
                <TextField
                    type="text"
                    name="Name"
                    label="Name"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Name").data}
                    state={itemManager.itemForm.getInput("Name").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Summary"
                    label="Summary"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Summary").data}
                    state={itemManager.itemForm.getInput("Summary").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="datetime-local"
                    name="Date"
                    label="Date"
                    smaller={true}
                    value={itemManager.itemForm.getInput("Date").data}
                    state={itemManager.itemForm.getInput("Date").state}
                    onChange={itemManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            {isCreator &&
                <ItemFormGroup head="Control Access">
                    <Select
                        name="Sharees"
                        label="Select Sharees"
                        toggleLabel="Select Sharees"
                        smaller={true}
                        values={itemManager.itemForm.getInput("Sharees").data}
                        state={itemManager.itemForm.getInput("Sharees").state}
                        options={employees}
                        onChange={itemManager.updateInputValue}
                        multiple={true}
                        disabled={false}
                    />
                </ItemFormGroup>
            }
        </ItemManagerWrapper>
    )
}